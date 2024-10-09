import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchProductByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { getProductbyId } = MakeProductsUseCase()

        const { id }:any = request.params

        const productsData = await getProductbyId.handle(id)
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