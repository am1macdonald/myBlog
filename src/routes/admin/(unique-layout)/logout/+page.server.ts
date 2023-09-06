import type { PageServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
import { JWT_TOKEN_NAME } from '$lib/constants';

export const load: PageServerLoad = async ({ cookies }) => {
	const authToken = cookies.get(JWT_TOKEN_NAME);
	if (authToken) {
		try {
			const authedUser = await authenticateUser(authToken);
			if (authedUser) {
				const newPayload = { user: authedUser.user, isRevoked: true };
				const newAuthToken = jwt.sign(newPayload, SECRET_JWT, {
					expiresIn: '0h'
				});
				cookies.set(JWT_TOKEN_NAME, newAuthToken, {
					httpOnly: true,
					sameSite: 'strict',
					path: '/',
					expires: new Date(0)
				});
			}
		} finally {
			/* empty */
		}
	}

	throw redirect(300, '/admin/login');
};
