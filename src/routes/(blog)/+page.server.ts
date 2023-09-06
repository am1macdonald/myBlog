import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await prisma.post.findMany({
		where: {
			isPublished: true
		},
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	});

	// getting images from s3 https://www.youtube.com/watch?v=eQAIojcArRY&t=653s

	return { feed: response };
};
