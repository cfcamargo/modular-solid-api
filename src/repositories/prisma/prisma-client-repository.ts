import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaClienteRepository {
	async create(data: Prisma.ClientCreateInput & {
		address: Prisma.AddressCreateInput;
		contacts: Prisma.ContactCreateManyInput[];
	}) {
		return await prisma.$transaction(async (tx) => {
			const client = await tx.client.create({
				data: {
					name: data.name,
					document: data.document,
					fantasyName: data.document,
					rg_ie: data.rg_ie,
					type: data.type,
					im: data.im,
				},
			});

			await tx.address.create({
				data: {
					street: data.address.street,
					number: data.address.number,
					city: data.address.city,
					country: data.address.country,
					neighborhood: data.address.neighborhood,
					state: data.address.state,
					clientId: client.id,
				},
			});

			for (const contact of data.contacts) {
				await tx.contact.create({
					data: {
						type: contact.type,
						contact: contact.contact,
						clientId: client.id,
					},
				});
			}

			return {
				client,
			};
		});
	}

    async findById(id: string) {
        const client = await prisma.client.findUnique({
            where: {
                id
            },
            include: {
                address: true,
                contacts: true
            }
        })

        return {
            client
        }
    }
}