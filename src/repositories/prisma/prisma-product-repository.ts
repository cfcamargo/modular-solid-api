import { Prisma, Product } from "@prisma/client";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProductRepository implements ProductsRepository{
    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({
            data
        })

        return product
    } 
}