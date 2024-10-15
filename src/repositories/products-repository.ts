import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
    create(data: Prisma.ProductCreateInput):Promise<Product>
    fetchProductsPaginated(page:number, perPage: number): Promise<{products: Product[], total: number}>
    getProductById(id: string): Promise<Product | null >
    manageQuantity(id: string, quantity: number): Promise<Product>
    updateProduct(id: string, data: Prisma.ProductCreateInput): Promise<Product>
    desactivateProduct(id: string): void
}