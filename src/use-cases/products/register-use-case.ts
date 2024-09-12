import { ProductsRepository } from "@/repositories/products-repository";

interface RegisterUseCaseRequest {
    name: string,
    brand: string,
    quantity: number
}

export class RegisterProductUseCase {
    constructor(private productRepository: ProductsRepository){}

    async handle({name, brand, quantity}: RegisterUseCaseRequest) {    
        const product = await this.productRepository.create({
            name,
            brand,
            quantity
        })

        return product
    }   
}