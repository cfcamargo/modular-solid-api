import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { FetchUsersUseCase } from "../users/fetch-users-use-case"
import { GetUserProfileUseCase } from "../users/get-user-profile-use-case"

export function makeUsersCase() {
    const usersRepository = new PrismaUsersRepository()
    const fethUsersUseCase = new FetchUsersUseCase(usersRepository)
    const profileUseCase = new GetUserProfileUseCase(usersRepository)

    return {
        profileUseCase, 
        fethUsersUseCase
    }
}