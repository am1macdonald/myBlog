import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/admin/login');
	}
};
