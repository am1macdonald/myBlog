import { prisma } from '$lib/server/prisma';
import type { PasswordChangeRequest } from '$lib/types/PasswordChangeRequest';
import bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '$lib/constants';
import type { TokenUser } from '$lib/types/UserToken';

export const checkResetToken = async (userId: number): Promise<boolean> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				passwordResetToken: true
			}
		});
		return user !== undefined && user !== null && user.passwordResetToken.length !== 0;
	} catch (error) {
		return false;
	}
};

export const resetPassword = async (
	request: PasswordChangeRequest
): Promise<TokenUser | undefined> => {
	const { password } = request;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: request.user.id
			},
			include: {
				passwordResetToken: true
			}
		});

		if (!user || !user.passwordResetToken) {
			return undefined;
		}

		const updateResult = await prisma.user.update({
			where: {
				id: request.user.id
			},
			data: {
				password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS),
				updatedAt: new Date(),
				defaultPassword: false,
				passwordResetToken: {
					deleteMany: {
						id: {
							in: user.passwordResetToken.map((token) => token.id)
						}
					}
				}
			}
		});

		if (!updateResult) {
			return undefined;
		}

		await prisma.passwordResetToken.deleteMany({
			where: {
				userId: request.user.id
			}
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: pw, ...rest } = updateResult;
		return rest;
	} catch (error) {
		return undefined;
	}
};
