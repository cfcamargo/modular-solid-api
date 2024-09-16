import { prisma } from "../../lib/prisma";
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = prisma.user.create({
            data
        })

        return user
    }

    findById(userId: string) {
        const user = prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async fetchUsersPaginated(page: number, perPage: number) {
        // Busca os produtos paginados
        const users: User[] = await prisma.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
        });

        const usersWithoutPassword = users.map(user => {
            const { hashed_password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        // Conta o número total de produtos
        const total = await prisma.user.count();

        return {
            users: usersWithoutPassword,
            total,
        };
    }
}