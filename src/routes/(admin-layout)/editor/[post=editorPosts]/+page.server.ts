import type { Actions, RequestEvent } from '@sveltejs/kit';

import { fail } from '@sveltejs/kit';

export const actions = {
	save: async ({ request }: RequestEvent) => {
		console.log(request);
		const formData = (await request.formData()) as FormData;
		const formEntries = Object.fromEntries((await request.formData()) as FormData);
		formData.forEach((value, key) => console.log(key, value));
		if (
			!(formEntries['post-image'] as File).name ||
			(formEntries['post-image'] as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'No file was uploaded'
			});
		}
	}
} satisfies Actions;
