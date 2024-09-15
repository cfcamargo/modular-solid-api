import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsErros } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
    email: string,
    password: string
}

interface AuthenticateUseCaseReply {
    user: User
}


export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handle({ email, password }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseReply>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsErros()
        }

        const doesPasswordMatches = await compare(password, user.hashed_password)

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsErros()
        }

        return {
            user
        }
    }
}