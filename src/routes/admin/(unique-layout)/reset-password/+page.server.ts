import type { Actions, RequestEvent } from './$types';
import type { ActionFailure, Redirect } from '@sveltejs/kit';
import type { PasswordChangeResponse } from '$lib/types/PasswordChangeResponse';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({
		request
	}: RequestEvent): Promise<
		PasswordChangeResponse | ActionFailure<PasswordChangeResponse> | Redirect
	> => {
		const { password, passwordConfirm } = Object.fromEntries(await request.formData());
		const passwordChangeResponse: PasswordChangeResponse = {
			error: false,
			message: '',
			password: '',
			passwordConfirm: ''
		};

		if (password !== passwordConfirm) {
			passwordChangeResponse.error = true;
			passwordChangeResponse.message = 'Passwords do not match';
			return fail(400, passwordChangeResponse);
		}

		return passwordChangeResponse;
	}
};
