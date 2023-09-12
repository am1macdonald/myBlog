import type { ActionFailure, Actions, Redirect, RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

const LoginResponse = z.object({
	username: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string().optional(),
	userType: z.enum(['ADMIN', 'USER'])
});

type LoginResponse = z.infer<typeof LoginResponse>;

export const actions: Actions = {
	default: async ({
		request
	}: RequestEvent): Promise<LoginResponse | ActionFailure<LoginResponse> | Redirect> => {
		const formObject = Object.fromEntries(await request.formData());
		console.log(formObject);
		const loginResponse = {
			email: '',
			password: '',
			error: false,
			message: ''
		};

		try {
			const adst = LoginResponse.parse(formObject);
			console.log(adst);
		} catch (e) {
			console.log(e);
		} finally {
			// empty
		}

		return loginResponse;
	}
};
