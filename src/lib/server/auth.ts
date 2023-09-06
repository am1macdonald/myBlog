import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
import type { User } from '@prisma/client';

export const authenticateUser = async (
	token: string
): Promise<{ user: User; isRevoked: boolean } | undefined> => {
	try {
		const { user, isRevoked } = jwt.verify(token, SECRET_JWT) as { user: User; isRevoked: boolean };
		if (isRevoked) return undefined;
		return { user, isRevoked };
	} catch (error) {
		return undefined;
	}
};
