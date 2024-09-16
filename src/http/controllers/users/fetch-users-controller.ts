import { MakeProductsUseCase } from "@/use-cases/factories/make-products-use-case";
import { makeFetchUsersUseCase } from "@/use-cases/factories/make-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchUsersController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { page = 1, perPage = 10 } = request.query as { page?: number; perPage?: number }

        const fetchUsersUseCase = makeFetchUsersUseCase()

        const usersData = await fetchUsersUseCase.handle(Number(page), Number(perPage))
        return reply.status(200).send({ 
            success: true,
            data: usersData
        })
    } catch (error) {
        return reply.status(500).send({ 
            success: false, 
            message: 'An error occurred while fetching products'
        })
    }
}