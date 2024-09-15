import { FastifyReply, FastifyRequest } from "fastify";

export async function logouController(request: FastifyRequest, reply: FastifyReply){
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
        return reply.status(400).send({ message: 'Refresh token não encontrado.' });
    }

    reply.clearCookie('refreshToken', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    return reply.status(200).send({ message: 'Logout realizado com sucesso.' });
}