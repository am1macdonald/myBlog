import type { Actions, RequestEvent } from './$types';
import type { ActionFailure, Redirect } from '@sveltejs/kit';
import type { PasswordChangeResponse } from '$lib/types/PasswordChangeResponse';
import { fail, redirect } from '@sveltejs/kit';
import { resetPassword } from '$lib/server/ResetPassword';

export const actions: Actions = {
	default: async ({
		request,
		locals
	}: RequestEvent): Promise<
		PasswordChangeResponse | ActionFailure<PasswordChangeResponse> | Redirect
	> => {
		const { password, confirmPassword } = Object.fromEntries(await request.formData());
		const passwordChangeResponse: PasswordChangeResponse = {
			error: false,
			message: '',
			password: '',
			passwordConfirm: ''
		};

		if (password !== confirmPassword) {
			passwordChangeResponse.error = true;
			passwordChangeResponse.message = 'Passwords do not match';
			return fail(400, passwordChangeResponse);
		}

		const { user } = locals;

		if (!user) {
			passwordChangeResponse.error = true;
			passwordChangeResponse.message = 'User not found';
			return fail(404, passwordChangeResponse);
		}
		try {
			const passwordChanged = await resetPassword({
				password: password as string,
				user: { id: user.id as number }
			});

			if (!passwordChanged) {
				passwordChangeResponse.error = true;
				passwordChangeResponse.message = 'Password not changed, please try again later';
				return fail(500, passwordChangeResponse);
			}

			console.log('Password changed');
			throw redirect(303, `/dashboard`);
		} finally {
			// empty
		}
		return passwordChangeResponse;
	}
};
