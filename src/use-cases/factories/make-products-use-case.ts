import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserUseCase } from "../users/register-use-case"
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository"
import { FetchProductsUseCase } from "../products/fetch-products-use-case"
import { RegisterProductUseCase } from "../products/register-use-case"

export function MakeProductsUseCase() {
    const productsRepository = new PrismaProductRepository()
    const fetchProductsUseCase = new FetchProductsUseCase(productsRepository)
    const productsUseCase = new RegisterProductUseCase(productsRepository)

    return {
        fetchProductsUseCase,
        productsUseCase
    }
}