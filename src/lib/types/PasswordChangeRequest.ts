import type { User } from '@prisma/client';

export type PasswordChangeRequest = {
	password: string;
	user: Pick<User, 'id'>;
};
