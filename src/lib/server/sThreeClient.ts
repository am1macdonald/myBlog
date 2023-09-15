import { AWS_S3_BUCKET_REGION } from '$env/static/private';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const clientParams = {
	region: AWS_S3_BUCKET_REGION
};
const client = new S3Client(clientParams);

export const getSignedImageUrl = async (bucket: string, key: string, expiresIn: number) => {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key
	});
	return await getSignedUrl(client, command, { expiresIn });
};
