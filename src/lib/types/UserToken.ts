import type { User } from '@prisma/client';

export type TokenUser = Omit<User, 'password'>;

export type UserToken = {
	user: TokenUser;
	isRevoked: boolean;
};
