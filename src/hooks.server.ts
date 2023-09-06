import type { Handle } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/auth';
import { JWT_TOKEN_NAME } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const token = event.cookies.get(JWT_TOKEN_NAME);
	const authentication = await authenticateUser(token ?? '');
	const user = authentication?.user;
	if (user) {
		event.locals.user = user;
	} else {
		event.locals.user = undefined;
	}
	if (
		!user &&
		url.pathname.startsWith('/admin') &&
		!url.pathname.startsWith('/admin/login') &&
		!url.pathname.startsWith('/admin/logout')
	) {
		throw redirect(303, '/admin/login');
	}

	//
	// if (response.status === 404) {
	// 	return {
	// 		status: 404,
	// 		headers: {
	// 			location: '/404'
	// 		}
	// 	};
	// }
	//
	return await resolve(event);
};
