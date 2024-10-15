import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class ManageQuantityUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle(id: string, quantity: number): Promise<Product | null> {
        const product = await this.productRepository.getProductById(id)
        
        if(!product){
            throw new ResourceNotFoundError()
        }

        // Atualiza a quantidade do produto no banco de dados
        const updatedProduct = await this.productRepository.manageQuantity(id, quantity);

        return updatedProduct;
    }
}