import type { ActionFailure, Actions, Redirect, RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const NewUserForm = z.object({
	username: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string().optional(),
	userRole: z.enum(['ADMIN', 'USER']),
	passwordSelection: z.coerce.number(),
	changePassword: z.coerce.boolean(),
	avatar: z.instanceof(File)
});

type NewUserForm = z.infer<typeof NewUserForm>;

type ErrorMessage = {
	error: boolean;
	zodErrors: z.ZodError;
	message: string;
};

export type NewUserResponse = NewUserForm & ErrorMessage;

export const actions: Actions = {
	default: async ({
		request
	}: RequestEvent): Promise<
		NewUserForm | ActionFailure<NewUserResponse | ErrorMessage> | Redirect
	> => {
		const formData = await request.formData();
		const formObject = Object.fromEntries(formData);
		let zParse: NewUserForm;
		try {
			zParse = NewUserForm.parse(formObject);
		} catch (e: unknown) {
			if (e instanceof z.ZodError) {
				return fail(400, { error: true, message: 'Invalid form data', zodErrors: e });
			} else {
				return fail(500, {
					error: true,
					message: 'Internal server error',
					zodErrors: new z.ZodError([])
				});
			}
		} finally {
			// empty
		}

		return zParse;
	}
};
