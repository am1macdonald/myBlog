type PostData = {
	id: number;
	title: string;
	content: string;
	publishedAt: Date;
	lastEditedAt: Date;
	isPublished: boolean;
	authorId: number;
	categoryId: number;
	tags: number[];
	image: File;
};

export default PostData;
