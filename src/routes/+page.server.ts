import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { s3Client } from '$lib/aws';
import { GetObjectCommand, ListBucketsCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { BUCKET_NAME } from '$env/static/private';

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
