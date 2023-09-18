import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { getSignedImageUrl } from '$lib/server/sThreeClient';
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type PostData from '$lib/types/PostData';

export const GET: RequestHandler = async ({ url }) => {
	// getting images from s3 https://www.youtube.com/watch?v=eQAIojcArRY&t=653s
	try {
		const query = url.searchParams;
		const post = await prisma.post.findMany({
			where: {
				isPublished: true,
				authorId: query.get('authorId')
					? z.coerce.number().parse(query.get('authorId'))
					: {
							not: undefined
					  }
			},
			take: z.coerce.number().parse(query.get('limit') ?? '10'),
			include: {
				author: {
					select: {
						name: true,
						email: true,
						bio: true,
						id: true
					}
				},
				image: {
					select: {
						bucketName: true,
						key: true
					}
				}
			},
			orderBy: {
				publishedDate: 'desc'
			}
		});

		const postsToReturn: Promise<PostData>[] = post.map(async (post): Promise<PostData> => {
			const { author, image, ...rest } = post;
			const postData = exclude(rest, ['isPublished', 'authorId', 'categoryId']);
			const { bucketName, key } = image ?? {};
			if (bucketName && key) {
				return {
					...postData,
					...author,
					imageURL: await getSignedImageUrl(bucketName, key, 60 * 60)
				};
			} else {
				return {
					...postData,
					...author,
					imageURL: ''
				};
			}
		});

		return json(await Promise.all(postsToReturn));
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
};

function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
	// Omit function from prisma docs
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
