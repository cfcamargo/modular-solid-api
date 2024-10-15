import { PrismaClienteRepository } from "@/repositories/prisma/prisma-client-repository";
import { RegisterClientUseCase } from "@/use-cases/clients/register-client-use-case";
import { MakeClientsUseCase } from "@/use-cases/factories/make-clients-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerClientController(request: FastifyRequest, reply: FastifyReply) {
    const registerClientSchema = z.object({
        type: z.enum(['pj', 'pf']),
        name: z.string().min(3),
        fantasyName: z.string().optional(),
        document: z.string(),
        rg_ie: z.number(),
        im: z.number().nullable(),
        address: z.object({
            street: z.string(),
            number: z.string(),
            neighborhood: z.string(),
            state: z.string(),
            city: z.string(),
            country: z.string(),
        }),
        contacts: z.array(z.object({
            type: z.enum(['phone', 'email']),
            contact: z.string(),
        }))
    });

    const {
        type,
        name,
        fantasyName,
        document,
        rg_ie,
        im,
        address,
        contacts
    } = registerClientSchema.parse(request.body);

    try {
        const { registerUseCase } = MakeClientsUseCase()

        await registerUseCase.handle({
            type,
            name,
            fantasyName,
            document,
            rg_ie,
            im,
            address,
            contacts
        });

        return reply.status(201).send();
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Erro ao registrar cliente' });
    }
}
