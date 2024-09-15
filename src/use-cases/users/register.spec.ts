import { RegisterUserUseCase } from './register-use-case'
import { describe, expect, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { UseerAlreadyExistsError } from '../errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUserUseCase

describe('Register user use case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUserUseCase(inMemoryUsersRepository)
    })

    it('should hash user password upon registration', async() => {
        const { user } = await registerUseCase.handle({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.hashed_password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('it should not be able to register with same email twice', async() => {
        const email = 'jhondoe@example.com'

        await registerUseCase.handle({
            name: 'Jhon Doe',
            email,
            password: '123456'
        })

        await expect(() => 
            registerUseCase.handle({
                name: 'Jhon Doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UseerAlreadyExistsError)
    })

    it('it should be able to register', async() => {
        const prismaUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)

        const email = 'jhondoe@example.com'

        const { user } = await registerUseCase.handle({
            name: 'Jhon Doe',
            email,
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
})