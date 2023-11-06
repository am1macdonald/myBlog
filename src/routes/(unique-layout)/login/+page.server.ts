import type { LoginResponse } from '$lib/types/LoginResponse';
import type { ActionFailure, Actions, Redirect, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
import type { User } from '@prisma/client';
import { JWT_TOKEN_NAME } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(307, `/admin/${locals.user.id}`);
	}
	return { clearUser: false };
};

export const actions: Actions = {
	default: async ({
		request,
		cookies
	}: RequestEvent): Promise<LoginResponse | ActionFailure<LoginResponse> | Redirect> => {
		const { email, password } = Object.fromEntries(await request.formData());
		const loginResponse: LoginResponse = {
			email: email as string,
			password: '',
			error: false,
			message: ''
		};

		try {
			const user: User | null = await prisma.user.findUnique({
				where: {
					email: email as string
				}
			});

			if (!user) {
				loginResponse.error = true;
				loginResponse.message = 'No user found with that email';
				return fail(401, loginResponse);
			}

			const validPassword = await bcrypt.compare(password.toString(), user.password);

			if (!validPassword) {
				loginResponse.error = true;
				loginResponse.message = 'Invalid password';
				return fail(401, loginResponse);
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password: accountPassword, ...userWithoutPassword } = user;

			const authToken = jwt.sign(
				{ user: { ...userWithoutPassword }, isRevoked: false },
				SECRET_JWT,
				{
					expiresIn: '24h'
				}
			);

			cookies.set(JWT_TOKEN_NAME, authToken, {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24
			});

			throw redirect(303, `/admin/dashboard`);
		} finally {
			/* empty */
		}
		return loginResponse;
	}
};
