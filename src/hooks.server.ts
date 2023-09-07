import type { Handle } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/auth';
import { JWT_TOKEN_NAME } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import { checkToken } from '$lib/server/ResetPassword';

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
	if (!user && url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
		throw redirect(303, '/admin/login');
	} else if (
		user &&
		user.defaultPassword &&
		url.pathname !== '/admin/reset-password' &&
		!url.pathname.startsWith('/admin/logout')
	) {
		const hasToken = await checkToken(user.id);
		if (!hasToken) {
			return new Response('Please contact an administrator to reset your password.', {
				status: 403
			});
		}
		return new Response('Redirect', {
			status: 303,
			headers: {
				location: '/admin/reset-password'
			}
		});
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
