import { User, Prisma } from "@prisma/client";
export interface UsersRepository {
    findById(userId: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput) : Promise<User>
    fetchUsersPaginated(page:number, perPage: number): Promise<{users: Omit<User, 'hashed_password'>[], total: number}>
}