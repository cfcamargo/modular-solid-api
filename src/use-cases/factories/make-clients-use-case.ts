import { PrismaClienteRepository } from "@/repositories/prisma/prisma-client-repository"
import { RegisterClientUseCase } from "../clients/register-client-use-case"
import { FetchClientsUseCase } from "../clients/fetch-clients-use-case"

export function MakeClientsUseCase() {
    const clientsRepository = new PrismaClienteRepository()
    const registerUseCase = new RegisterClientUseCase(clientsRepository)
    const fetchClientsPaginated = new FetchClientsUseCase(clientsRepository)


    return {
        registerUseCase,
        fetchClientsPaginated
    }
}