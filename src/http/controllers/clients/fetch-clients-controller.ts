import { MakeClientsUseCase } from "@/use-cases/factories/make-clients-use-case";
import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchClientsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { page = 1, perPage = 10 } = request.query as { page?: number; perPage?: number }

        const { fetchClientsPaginated } = MakeClientsUseCase()

        const clientsData = await fetchClientsPaginated.handle(Number(page), Number(perPage))
        return reply.status(200).send({ 
            success: true,
            data: clientsData
        })
    } catch (error) {
        return reply.status(500).send({ 
            success: false, 
            message: 'An error occurred while fetching products'
        })
    }
}