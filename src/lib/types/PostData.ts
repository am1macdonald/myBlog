import type { Author, Post } from '@prisma/client';

export type PostData = Omit<Post, 'isPublished' | 'authorId' | 'categoryId'> &
	Omit<Author, 'userId'> & { ImageURL: string };

export default PostData;
