import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/users/register-user-controller'
import { registerProductsController } from './controllers/products/register-products-controller'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController )

    app.post('/products', registerProductsController )
}