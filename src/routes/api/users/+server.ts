import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { authenticateUser } from '$lib/server/auth';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const limit = Number(url.searchParams.get('limit') || 10);
	const token = cookies.get('authToken');

	if (!token) {
		throw error(401, 'Unauthorized');
	}

	const { user, isRevoked } = (await authenticateUser(token)) || {};

	if (!user || isRevoked) {
		throw error(401, 'Unauthorized');
	}

	if (!user.role || user.role !== 'ADMIN') {
		throw error(403, 'Forbidden');
	}

	if (isNaN(limit) || limit < 1) {
		throw error(400, 'Invalid limit');
	}

	const users = await prisma.user.findMany({
		take: limit
	});

	return json({ users: users.map((user) => ({ ...user, password: undefined })) });
};
