import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/users/register-user-controller'
import { registerProductsController } from './controllers/products/register-products-controller'
import { authenticateController } from './controllers/auth/authenticate-controller'
import { profile } from './controllers/users/profile-controller'
import { refreshController } from './controllers/auth/refresh-controller'
import { logouController } from './controllers/auth/logout-controller'

export async function appRoutes(app: FastifyInstance) {
    app.post('/sessions', authenticateController)
    app.post('/logout', logouController)
    app.patch('/token/refresh',refreshController)
    app.get('/me', profile)
    
    app.post('/users', registerUserController )

    app.post('/products', registerProductsController )
}