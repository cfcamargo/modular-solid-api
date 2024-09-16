import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchProductsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { page = 1, perPage = 10 } = request.query as { page?: number; perPage?: number }

        const { fetchProductsUseCase } = MakeProductsUseCase()

        const productsData = await fetchProductsUseCase.handle(Number(page), Number(perPage))
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