import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/auth';
import { JWT_TOKEN_NAME } from '$lib/constants';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const token = event.cookies.get(JWT_TOKEN_NAME);
	const authentication = await authenticateUser(token ?? '');
	const user = authentication?.user;
	if (user && !url.pathname.startsWith('/logout')) {
		event.locals.user = user;
	} else {
		event.locals.user = undefined;
	}

	if (!user && url.pathname.startsWith('/admin') && !url.pathname.startsWith('/login')) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};
