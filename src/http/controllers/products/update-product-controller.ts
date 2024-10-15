import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { RegisterProductUseCase } from "@/use-cases/products/register-use-case";
import { UpdateProductUseCase } from "@/use-cases/products/update-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateProductController(request: FastifyRequest, reply: FastifyReply) {
    const registerProductSchema = z.object({
        name : z.string().min(3),
        brand: z.string(),
        quantity: z.number(),
        price: z.number()
    })

    const { name, brand, quantity, price } = registerProductSchema.parse(request.body)

    const { id }:any = request.params

    try{
        const { updateProduct } = MakeProductsUseCase()

        const response = await updateProduct.handle(id, {
            name,
            brand,
            quantity,
            price
        })

        return reply.status(201).send({
            response
        })

    } catch(err) {
        throw err
    }
}