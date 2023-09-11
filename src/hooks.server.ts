import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/auth';
import { JWT_TOKEN_NAME } from '$lib/constants';
import { checkResetToken } from '$lib/server/ResetPassword';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const token = event.cookies.get(JWT_TOKEN_NAME);
	const authentication = await authenticateUser(token ?? '');
	const user = authentication?.user;
	if (user && !url.pathname.startsWith('/logout')) {
		event.locals.user = user;
		const hasPasswordResetToken = await checkResetToken(user.id);
		if (hasPasswordResetToken && !url.pathname.startsWith('/reset-password')) {
			throw redirect(303, '/reset-password');
		} else if (!hasPasswordResetToken && url.pathname.startsWith('/reset-password')) {
			throw redirect(303, `/profile/${user.id}`);
		}
	} else {
		event.locals.user = undefined;
	}

	if (!user && url.pathname.startsWith('/admin') && !url.pathname.startsWith('/login')) {
		throw redirect(303, '/login');
	}

	if (url.pathname.startsWith('/reset-password')) {
		const result = checkResetToken(user?.id ?? -1);
		if (!result) {
			throw redirect(303, '/login');
		}
	}

	return resolve(event);
};
