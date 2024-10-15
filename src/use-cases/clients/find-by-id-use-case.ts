import { ClientsRepository } from "@/repositories/clients-repository";

export class FindByIdUseCase {
    constructor(private clientsRepository: ClientsRepository){}

    async handle(id:string) {
       const client = await this.clientsRepository.findById(id)
       return client
    }

}