import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import type { Author, Post } from '@prisma/client';
import { getSignedImageUrl } from '$lib/server/sThreeClient';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

type PostToReturn = Omit<Post, 'isPublished' | 'authorId' | 'categoryId'> &
	Omit<Author, 'userId'> & { ImageURL: string };

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

		const postsToReturn: Promise<PostToReturn>[] = post.map(async (post): Promise<PostToReturn> => {
			const { author, image, ...rest } = post;
			const postData = exclude(rest, ['isPublished', 'authorId', 'categoryId']);
			const { bucketName, key } = image ?? {};
			if (bucketName && key) {
				return {
					...postData,
					...author,
					ImageURL: await getSignedImageUrl(bucketName, key, 60 * 60)
				};
			} else {
				return {
					...postData,
					...author,
					ImageURL: ''
				};
			}
		});

		return json(await Promise.all(postsToReturn));
	} catch (error) {
		console.log(error);
		return json({ error: 'Internal Server Error' }, 500);
	}
};

function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
	return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
