// fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            role: 'ADMIN' | 'DEFAULT',
            sub: string
        } // user type is return type of `request.user` object
    }
}