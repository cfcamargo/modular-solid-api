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
        });

        // Conta o número total de produtos
        const total = await prisma.product.count();

        return {
            products,
            total,
        };
    }
}