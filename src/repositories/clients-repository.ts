import { Client, Prisma, Product } from "@prisma/client";
export interface ClientsRepository {
    create(data: Prisma.ClientCreateInput):Promise<Client>
    fetchClientsPaginated(page:number, perPage: number): Promise<{clients: Client[], total: number}>
    findById(id: string): Promise<Client | null>
}