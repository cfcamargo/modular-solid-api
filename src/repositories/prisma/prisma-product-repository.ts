import { Prisma, Product } from "@prisma/client";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements ProductsRepository {
    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({
            data,
        });

        return product;
    }

    async fetchProductsPaginated(page: number, perPage: number) {
        // Busca os produtos paginados
        const products: Product[] = await prisma.product.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            where: {
                desactivated_at: null,
            },
        });

        // Conta o número total de produtos
        const total = await prisma.product.count();

        return {
            products,
            total,
        };
    }

    async getProductById(id: string){
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        return product
    }

    async manageQuantity(id: string, quantity: number): Promise<Product> {
        return await prisma.product.update({
            where: { id },
            data: { quantity }
        })
    }

    async updateProduct(id: string, data: Prisma.ProductCreateInput) {
        return await prisma.product.update({
            where: { id },
            data
        })
    }

    async desactivateProduct(id: string) {
        return await prisma.product.update({
            where: { id },
            data: {
                desactivated_at: new Date(Date.now())
            }
        })
    }
}