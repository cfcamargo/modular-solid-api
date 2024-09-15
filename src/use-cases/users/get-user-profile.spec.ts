import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile-case'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Authenticate use case',() => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
    })

    it('should be able to get user profile', async () => {
        const hashed_password = await hash('123456', 6)

        const createdUser = await userRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hashed_password
        })

        const { user } = await getUserProfileUseCase.handle({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('Jhon Doe')
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            getUserProfileUseCase.handle({
                userId: 'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})