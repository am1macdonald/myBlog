import { prisma } from '$lib/server/prisma';
import type { PasswordChangeRequest } from '$lib/types/PasswordChangeRequest';
import bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '$lib/constants';

export const checkToken = async (userId: number): Promise<boolean> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				passwordResetToken: true
			}
		});

		if (user && user.passwordResetToken.length !== 0) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

export const resetPassword = async (
	request: PasswordChangeRequest
): Promise<Response | undefined> => {
	const { password } = request;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: request.user
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
				id: request.user
			},
			data: {
				password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
			}
		});
	} catch (error) {
		return undefined;
	}
};
