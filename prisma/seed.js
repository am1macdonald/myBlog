import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { email: 'am1macdonald@gmail.com' },
		update: {},
		create: {
			email: 'am1macdonald+admin@gmail.com',
			name: 'Adam MacDonald',
			password: await bcrypt.hash('admin', 10),
			role: 'ADMIN'
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
