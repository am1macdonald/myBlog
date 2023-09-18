import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { getSignedImageUrl } from '$lib/server/sThreeClient';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export const GET: RequestHandler = async ({ params }) => {
	// getting images from s3 https://www.youtube.com/watch?v=eQAIojcArRY&t=653s
	let postToReturn;
	const { post: postID } = params;
	if (!postID) {
		throw error(404, 'Not Found');
	}
	let post;
	try {
		post = await prisma.post.findUnique({
			where: {
				id: z.coerce.number().parse(postID)
			},
			include: {
				author: {
					select: {
						name: true,
						email: true,
						id: true
					}
				},
				image: {
					select: {
						bucketName: true,
						key: true
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		throw error(500, 'Internal Server Error');
	}
	if (!post) {
		throw error(404, 'Not Found');
	}

	const { author, image, ...postData } = post;

	const { bucketName, key } = image ?? {};
	if (bucketName && key) {
		postToReturn = {
			...postData,
			...author,
			imageURL: await getSignedImageUrl(bucketName, key, 60 * 60)
		};
	} else {
		postToReturn = {
			...postData,
			...author,
			imageURL: ''
		};
	}

	return json(postToReturn);
};
