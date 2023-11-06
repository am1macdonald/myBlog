import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/admin/login');
	} else {
		throw redirect(303, '/admin/dashboard');
	}
	return { user: locals.user };
};
