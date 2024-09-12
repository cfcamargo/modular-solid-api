import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UseerAlreadyExistsError } from "../errors/user-already-exists-error";

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

    async handle({ name, email, password }: RegisterUseCaseRequest):Promise<RegisterUseCaseResponse> {
        const hashed_password = await hash(password, 6)
    
        const userWhithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(userWhithSameEmail){
            throw new UseerAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({
            name,
            email,
            hashed_password
        })

        return {
            user
        }
    }
}


