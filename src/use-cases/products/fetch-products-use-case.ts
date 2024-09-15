import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"


export class ListProductUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle(page: number, perPage: number): Promise<Product[]> {    
        const products = await this.productRepository.fetchProductsPaginated(page, perPage)
        return products
    } 
}