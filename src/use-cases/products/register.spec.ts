import { ProductsRepository } from '@/repositories/products-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { RegisterProductUseCase } from './register-use-case'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'

let inMemoryProductsRepository: ProductsRepository
let registerProductUseCase: RegisterProductUseCase

describe('Register Product Use Case', () => {
    beforeEach(() => {
        inMemoryProductsRepository = new InMemoryProductsRepository()
        registerProductUseCase = new RegisterProductUseCase(inMemoryProductsRepository)
    })

    it('shoul be able to create a product', async() => {
        const { product } = await registerProductUseCase.handle({
            brand: 'Marca',
            name : 'Produto 1',
            quantity : 0
        })

        expect(product.id).toEqual(expect.any(String))
    })
    
})