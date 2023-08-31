import type { Actions, RequestEvent } from '@sveltejs/kit';
import { BUCKET_NAME } from '$env/static/private';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '$lib/aws';
import * as crypto from 'crypto';
import { prisma } from '$lib/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
	submit: async ({ request }: RequestEvent) => {
		const formData = Object.fromEntries(await request.formData());
		if (
			!(formData.fileToUpload as File).name ||
			(formData.fileToUpload as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'No file was uploaded'
			});
		}
		const buffer = Buffer.from(await (formData.fileToUpload as File).arrayBuffer());

		const name = crypto.randomBytes(32).toString('hex');
		const params = {
			Bucket: BUCKET_NAME,
			Key: name,
			Body: buffer,
			ContentType: (formData.fileToUpload as File).type
		};
		console.log(params);

		const command = new PutObjectCommand(params);

		const sendResult = await s3Client.send(command);
		console.log(sendResult);

		const { fileToUpload } = formData as { fileToUpload: File };
	}
} satisfies Actions;
