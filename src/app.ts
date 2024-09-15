import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(cors, {
    origin: '*', // Permite qualquer origem. Para produção, você deve especificar o domínio.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if(error instanceof ZodError){
        return reply
            .status(400)
            .send({ 
                message: 'Validation Error', 
                issues: error.format()
            })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else {
        // TODO: Here we should log to an external toll like Datadog.
    }

    return reply.status(500).send({ message: 'Internal Server Error'})
})
