import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";

export class FetchClientsUseCase {
    constructor(private clientsRepository: ClientsRepository){}

    async handle(page: number = 1, perPage: number = 10): Promise<{
        clients: Client[],
        total: number,
        page: number,
        perPage: number,
        totalPages: number
    }>  {

        if (page < 1) page = 1
        if (perPage < 1) perPage = 10

        const { clients, total } = await this.clientsRepository.fetchClientsPaginated(page, perPage)

        const totalPages = Math.ceil(total / perPage)

        return {
            clients,
            total,
            page,
            perPage,
            totalPages
        }
    }
}