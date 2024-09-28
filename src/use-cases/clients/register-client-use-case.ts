import { ClientsRepository } from "@/repositories/clients-repository";
import { Client, Product } from "@prisma/client";
import { Prisma } from "@prisma/client";

interface RegisterUseCaseRequest {
    type: 'pj' | 'pf',
    name: string,
    fantasyName?: string,
    document: string,
    rg_ie: number,
    im: number | null,
    address: Prisma.AddressCreateWithoutClientInput,
    contacts: Prisma.ContactCreateWithoutClientInput[]
}

interface RegisterUseCaseReponse {
    client: Client
}

export class RegisterClientUseCase {
    constructor(private clientsRepository: ClientsRepository){}

    async handle(data: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {    
        const client = await this.clientsRepository.create({
            name: data.name,
            document: data.document,
            fantasyName: data.fantasyName,
            rg_ie: data.rg_ie,
            type: data.type,
            address: {
                create: data.address
            },
            contacts: {
                create: data.contacts
            },
            im: data.im
        })

        return {
            client
        }
    }   
}