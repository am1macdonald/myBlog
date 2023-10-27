import { ACCESS_KEY, AWS_S3_BUCKET_REGION, SECRET_ACCESS_KEY } from '$env/static/private';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BUCKET_NAME } from '$env/static/private';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import { prisma } from '$lib/server/prisma';
import sharp from 'sharp';

const clientParams = {
	region: AWS_S3_BUCKET_REGION,
	credentials: {
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY
	}
};
const client = new S3Client(clientParams);

export const getSignedImageUrl = async (bucket: string, key: string, expiresIn: number) => {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key
	});
	return await getSignedUrl(client, command, { expiresIn });
};

export const uploadPostImage = async (file: File) => {
	const buffer = Buffer.from(await file.arrayBuffer());

	const processed = await sharp(buffer)
		.resize({ width: 575, height: 575 })
		.webp({ lossless: true })
		.toBuffer();

	const name = crypto.randomBytes(32).toString('hex');

	const params = {
		Bucket: BUCKET_NAME,
		Key: name,
		Body: processed,
		ContentType: file.type
	};

	const command = new PutObjectCommand(params);

	const sendResult = await client.send(command);

	if (sendResult) {
		return name;
	} else {
		return undefined;
	}
};
