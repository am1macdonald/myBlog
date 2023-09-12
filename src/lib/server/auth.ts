import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
import type { TokenUser } from '$lib/types/UserToken';

export const authenticateUser = async (
	token: string
): Promise<{ user: TokenUser; isRevoked: boolean } | undefined> => {
	try {
		const { user, isRevoked } = jwt.verify(token, SECRET_JWT) as {
			user: TokenUser;
			isRevoked: boolean;
		};
		if (isRevoked) return undefined;
		return { user, isRevoked };
	} catch (error) {
		return undefined;
	}
};
