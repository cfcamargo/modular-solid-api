import { Prisma, Product } from "@prisma/client";
export interface ProductsRepository {
    create(data: Prisma.ProductCreateInput):Promise<Product>
    fetchProductsPaginated(page:number, perPage: number): Promise<{products: Product[], total: number}>
    getProductById(id: string): Promise<Product | null >
}