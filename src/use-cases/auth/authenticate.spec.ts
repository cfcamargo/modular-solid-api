
import { describe, expect, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from '../users/register-use-case'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsErros } from '../errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate use case',() => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)
    })

    it('should be able to authenticate', async () => {
        const hashed_password = await hash('123456', 6)

        await inMemoryUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hashed_password
        })

        const { user } = await authenticateUseCase.handle({
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            authenticateUseCase.handle({
                email: 'jhondoe@example.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsErros)
    })

    it('should not be able to authenticate with wrong password', async() => {
        const hashed_password = await hash('123456', 6)

        await inMemoryUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hashed_password
        })

        await expect(() =>
            authenticateUseCase.handle({
                email: 'jhondoe@example.com',
                password: '12345336'
            })).rejects.toBeInstanceOf(InvalidCredentialsErros)
    })
})