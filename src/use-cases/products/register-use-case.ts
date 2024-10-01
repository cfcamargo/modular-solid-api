import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string,
    brand: string,
    quantity: number,
    price: number
}

interface RegisterUseCaseReponse {
    product: Product
}

export class RegisterProductUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle({name, brand, quantity, price}: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {    
        const product = await this.productRepository.create({
            name,
            brand,
            quantity,
            price
        })

        return {
            product
        }
    }   
}