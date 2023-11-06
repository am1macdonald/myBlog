import type { Actions, RequestEvent } from '@sveltejs/kit';

import { fail } from '@sveltejs/kit';

export const actions = {
	save: async ({ cookies, request }: RequestEvent) => {
		const formEntries = Object.fromEntries((await request.formData()) as FormData);
		console.log(cookies.getAll());
		if (
			!(formEntries['post-image'] as File).name ||
			(formEntries['post-image'] as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'No file was uploaded'
			});
		}
		return fail(500, {
			error: true,
			message: 'This route is not implemented yet'
		});
	}
} satisfies Actions;
