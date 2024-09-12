import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@/use-cases/users/register-use-case'
import { UseerAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try{
        const usersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUserUseCase(usersRepository)

        await registerUseCase.handle({
            name,
            email,
            password
        })
    } catch (err) {
        if(err instanceof UseerAlreadyExistsError){
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}