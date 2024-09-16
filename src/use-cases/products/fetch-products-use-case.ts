import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"


export class FetchProductsUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle(page: number = 1, perPage: number = 10): Promise<{
            products: Product[],
            total: number,
            page: number,
            perPage: number,
            totalPages: number
    }> {
        if (page < 1) page = 1
        if (perPage < 1) perPage = 10
    
        const { products, total } = await this.productRepository.fetchProductsPaginated(page, perPage)
    
        const totalPages = Math.ceil(total / perPage)

        return {
            products,
            total,
            page,
            perPage,
            totalPages
        }
    }
}