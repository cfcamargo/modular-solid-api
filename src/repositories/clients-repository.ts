import { Client, Prisma, Product } from "@prisma/client";
export interface ClientsRepository {
    create(data: Prisma.ClientCreateInput):Promise<Client>
    // fetchProductsPaginated(page:number, perPage: number): Promise<{products: Product[], total: number}>
    findById(id: string): Promise<Client | null>
}