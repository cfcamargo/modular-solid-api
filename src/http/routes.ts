import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/users/register-user-controller'
import { registerProductsController } from './controllers/products/register-products-controller'
import { authenticateController } from './controllers/auth/authenticate-controller'
import { profile } from './controllers/users/profile-controller'
import { refreshController } from './controllers/auth/refresh-controller'

export async function appRoutes(app: FastifyInstance) {
    app.post('/sessions', authenticateController)
    app.patch('/token/refresh',refreshController)
    
    app.post('/users', registerUserController )
    app.get('/me', profile)

    app.post('/products', registerProductsController )
}