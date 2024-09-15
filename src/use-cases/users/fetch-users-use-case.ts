import { ProductsRepository } from "@/repositories/products-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { Product, User } from "@prisma/client"


export class FetchProducsUseCase {
    constructor(private userRepository: UsersRepository){}

    async handle(page: number, perPage: number): Promise<User[]> {    
        const users = await this.userRepository.fetchUsersPaginated(page, perPage)
        return users
    } 
}