import { Prisma, Product } from "@prisma/client"
import { ProductsRepository } from "../products-repository"
import { randomUUID } from "crypto"

export class InMemoryProductsRepository implements ProductsRepository{
    public items: Product[] = []

    async create(data: Prisma.ProductCreateInput) {
        const product: Product = {
            id: randomUUID(),
            brand: 'Modular',
            created_at : new Date(),
            desactivated_at: null,
            name: 'Produto 1',
            quantity: 1,
        }

        this.items.push(product)

        return product
    }

    async fetchProductsPaginated(page: number, perPage: number){
        const products = this.items.slice(page, perPage)
        return products
    }
}