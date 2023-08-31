import { S3Client } from '@aws-sdk/client-s3';
import { ACCESS_KEY, BUCKET_REGION, SECRET_ACCESS_KEY } from '$env/static/private';

const s3Client = new S3Client({
	// credentials: {
	// 	accessKeyId: ACCESS_KEY,
	// 	secretAccessKey: SECRET_ACCESS_KEY
	// },
	region: BUCKET_REGION
});

export { s3Client };
