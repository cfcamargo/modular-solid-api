import { Client, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaClienteRepository {
	async create(data: Prisma.ClientCreateInput & {
		address: Prisma.AddressCreateInput;
		contacts: Prisma.ContactCreateManyInput[];
	}) {
		return await prisma.client.create({
			data: {
				name: data.name,
				document: data.document,
				fantasyName: data.fantasyName,
				rg_ie: data.rg_ie,
				type: data.type,
				im: data.im,
				address: data.address,
				contacts: data.contacts,
			},
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

		if(!client) {
			return null
		}

        return {
			id: client.id,
			type: client.type,
			name: client.name,
			fantasyName: client.fantasyName,
			document: client.document,
			rg_ie: client.rg_ie,
			im: client.im,
			created_at: client.created_at,
			updated_at: client.updated_at,
			desactivated_at: client.desactivated_at,
		}
    }

	async fetchClientsPaginated(page: number, perPage: number) {
        const clients: Client[] = await prisma.client.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            where: {
                desactivated_at: null,
            },
        });
		
        const total = await prisma.client.count();

        return {
            clients,
            total,
        };
	}
}