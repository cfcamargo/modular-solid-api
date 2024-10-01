import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"


export class getProductById {
    constructor(private productRepository: ProductsRepository){}

    async handle(id: string): Promise<Product | null> {
        const product = await this.productRepository.getProductById(id)
        return product
    }
}