import { MakeClientsUseCase } from "@/use-cases/factories/make-clients-use-case";
import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchClientController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { findByIdUseCase } = MakeClientsUseCase()

        const { id }:any = request.params

        const productsData = await findByIdUseCase.handle(id)
        return reply.status(200).send({ 
            success: true,
            data: productsData
        })
    } catch (error) {
        return reply.status(500).send({ 
            success: false, 
            message: 'An error occurred while fetching products'
        })
    }
}