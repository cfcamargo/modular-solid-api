import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from './register-use-case'
import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
    it('should hash user password upon registration', async() => {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)

        const { user } = await registerUseCase.handle({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.hashed_password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})