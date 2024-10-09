import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/users/register-user-controller'
import { registerProductsController } from './controllers/products/register-products-controller'
import { authenticateController } from './controllers/auth/authenticate-controller'
import { profile } from './controllers/users/profile-controller'
import { refreshController } from './controllers/auth/refresh-controller'
import { logouController } from './controllers/auth/logout-controller'
import { fetchProductsController } from './controllers/products/fetch-products-controller'
import { fetchUsersController } from './controllers/users/fetch-users-controller'
import { registerClientController } from './controllers/clients/register-client-controller'
import { verifyJWT } from './midlewares/verify-jwt'
import { fetchProductByIdController } from './controllers/products/fetch-product-controller'

export async function appRoutes(app: FastifyInstance) {
    app.post('/sessions', authenticateController)
    app.post('/logout', { onRequest: [verifyJWT] } , logouController)
    app.patch('/token/refresh',refreshController)
    app.get('/me', { onRequest: [verifyJWT] }, profile)
    
    app.post('/users', registerUserController )
    app.get('/users', { onRequest: [verifyJWT] } , fetchUsersController)

    app.post('/products',{ onRequest: [verifyJWT] }, registerProductsController)
    app.get('/products', { onRequest: [verifyJWT] }, fetchProductsController)
    app.get('/products/:id', { onRequest: [verifyJWT] }, fetchProductByIdController)

    app.post('/clients', { onRequest: [verifyJWT] } , registerClientController)
}