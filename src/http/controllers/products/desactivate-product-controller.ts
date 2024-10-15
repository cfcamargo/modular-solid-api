import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function desactivateProductController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { desactivateProductUseCase } = MakeProductsUseCase()

        const { id }:any = request.params

        await desactivateProductUseCase.handle(id)
        
        return reply.status(200).send({
            message: 'Product Successfull Desactivated'
        })
    } catch (error) {
        return reply.status(500).send({ 
            success: false, 
            message: 'An error occurred while desactivate product'
        })
    }
}