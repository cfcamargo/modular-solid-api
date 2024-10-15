import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserUseCase } from "../users/register-use-case"
import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository"
import { FetchProductsUseCase } from "../products/fetch-products-use-case"
import { RegisterProductUseCase } from "../products/register-use-case"
import { getProductById } from "../products/get-product--by-id-use-case"
import { UpdateProductUseCase } from "../products/update-product-use-case"
import { DesactivateProductUseCase } from "../products/desactivate-product-use-case"

export function MakeProductsUseCase() {
    const productsRepository = new PrismaProductRepository()
    const fetchProductsUseCase = new FetchProductsUseCase(productsRepository)
    const productsUseCase = new RegisterProductUseCase(productsRepository)
    const getProductbyId = new getProductById(productsRepository)
    const updateProduct = new UpdateProductUseCase(productsRepository)
    const desactivateProductUseCase = new DesactivateProductUseCase(productsRepository)


    return {
        fetchProductsUseCase,
        productsUseCase,
        getProductbyId,
        updateProduct,
        desactivateProductUseCase
    }
}