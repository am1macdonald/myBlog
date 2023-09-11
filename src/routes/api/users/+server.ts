import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit') || 10);

	if (isNaN(limit) || limit < 1) {
		throw error(400, 'Invalid limit');
	}

	const users = await prisma.user.findMany({
		take: limit
	});

	return json({ users: users.map((user) => ({ ...user, password: undefined })) });
};
