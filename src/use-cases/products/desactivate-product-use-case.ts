import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"


export class DesactivateProductUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle(id: string) {
        await this.productRepository.desactivateProduct(id)
    }
}