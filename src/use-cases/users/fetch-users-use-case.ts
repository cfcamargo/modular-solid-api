import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"

export class FetchUsersUseCase {
    constructor(private usersRepository: UsersRepository){}

    async handle(page: number = 1, perPage: number = 10): Promise<{
            users: Omit<User, 'hashed_password'>[],
            total: number,
            page: number,
            perPage: number,
            totalPages: number
    }> {
        if (page < 1) page = 1
        if (perPage < 1) perPage = 10
    
        const { users, total } = await this.usersRepository.fetchUsersPaginated(page, perPage)
    
        const totalPages = Math.ceil(total / perPage)

        return {
            users,
            total,
            page,
            perPage,
            totalPages
        }
    }
}