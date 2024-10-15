import { ProductsRepository } from "@/repositories/products-repository"
import { Product } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface RegisterUseCaseRequest {
    name: string,
    brand: string,
    quantity: number,
    price: number
}

export class UpdateProductUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle(id: string, data: RegisterUseCaseRequest): Promise<Product | null> {
        const product = await this.productRepository.getProductById(id)
        
        if(!product){
            throw new ResourceNotFoundError()
        }

        // Atualiza a quantidade do produto no banco de dados
        const updatedProduct = await this.productRepository.updateProduct(id, data);

        return updatedProduct;
    }
}