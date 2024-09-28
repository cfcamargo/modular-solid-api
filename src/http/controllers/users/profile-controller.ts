import { makeUsersCase } from "@/use-cases/factories/make-users-use-case";
import { GetUserProfileUseCase } from "@/use-cases/users/get-user-profile-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply){
    await request.jwtVerify()

    const profileUseCase =  makeUsersCase().profileUseCase

    const user_authenticated = request.user
    const { user } = await profileUseCase.handle({userId: user_authenticated.sub})
    const { hashed_password, ...userWithoutPassword } = user;

    return reply.status(200).send({
        data: userWithoutPassword
    })
}