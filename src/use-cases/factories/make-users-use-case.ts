import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { FetchUsersUseCase } from "../users/fetch-users-use-case"

export function makeFetchUsersUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const fethUsersUseCase = new FetchUsersUseCase(usersRepository)

    return fethUsersUseCase
}