import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user : User
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async handle({ name, email, password }: RegisterUseCaseRequest) {
        const hashed_password = await hash(password, 6)
    
        const userWhithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(userWhithSameEmail){
            throw new Error('E-mail already exists')
        }
    
        const user = await this.usersRepository.create({
            name,
            email,
            hashed_password
        })
    }
}


