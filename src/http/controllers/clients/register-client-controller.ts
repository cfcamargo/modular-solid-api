import { PrismaClienteRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository";
import { RegisterClientUseCase } from "@/use-cases/clients/register-client-use-case";
import { RegisterProductUseCase } from "@/use-cases/products/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerClientController(request: FastifyRequest, reply: FastifyReply) {
    const registerProductSchema = z.object({
        name : z.string().min(3),
        fantasyName: z.string(),
        document: z.string(),
        rg_ie: z.number(),
        im: z.number().nullable(),
        address:z.object({
            street: z.string(),
            number: z.string(),
            neighborhood: z.string(),
            state: z.string(),
            city: z.string(),
            country: z.string(),
        }),
        contacts: z.array(z.object({
            type: z.string(),
            contact: z.string()
        }))
    })

    const { 
        name,
        fantasyName,
        document,
        rg_ie,
        im,
        address,
        contacts
    } = registerProductSchema.parse(request.body)

    try{
        const clientsRepository = new PrismaClienteRepository()
        const clientUseCase = new RegisterClientUseCase(clientsRepository)

        clientUseCase.handle({
            name, fantasyName,document,rg_ie, im, address, contacts
        })

    } catch(err) {
        throw err
    }

    return reply.status(201).send()
}