import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user:User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            hashed_password : data.hashed_password,
            created_at: new Date(),
            desactivated_at : null,
            role: 'DEFAULT'
        }

        this.items.push(user)

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }

    async findById(userId: string){
        const user = this.items.find(item => item.id === userId)

        if(!user){
            return null
        }

        return user
    }
}