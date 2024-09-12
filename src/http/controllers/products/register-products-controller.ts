import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { RegisterProductUseCase } from "@/use-cases/products/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerProductsController(request: FastifyRequest, reply: FastifyReply) {
    const registerProductSchema = z.object({
        name : z.string().min(3),
        brand: z.string(),
        quantity: z.number()
    })

    const { name, brand, quantity } = registerProductSchema.parse(request.body)

    try{
        const productRepository = new PrismaProductRepository()
        const productUseCase = new RegisterProductUseCase(productRepository)

        productUseCase.handle({
            name,
            brand,
            quantity
        })

    } catch(err) {
        return reply.status(500).send
    }

    return reply.status(201).send()
}