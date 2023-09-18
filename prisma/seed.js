import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const PASSWORD_SALT_ROUNDS = 10;

async function main() {
	const user = await prisma.user.upsert({
		where: { email: 'am1macdonald+admin@gmail.com' },
		update: {},
		create: {
			email: 'am1macdonald+admin@gmail.com',
			userName: 'secretAdminMan',
			name: 'Adam MacDonald',
			password: await bcrypt.hash(process.env.DEFAULT_PASSWORD, PASSWORD_SALT_ROUNDS),
			role: 'ADMIN'
		}
	});

	await prisma.passwordResetToken.upsert({
		where: { id: 1 },
		update: {},
		create: {
			token: jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
				expiresIn: '1h'
			}),
			passwordResetTokenExpiry: new Date(Date.now() + 3600000),
			user: {
				connect: {
					id: user.id
				}
			}
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
