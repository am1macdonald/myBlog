import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const getPosts = async () => {
		const response = await fetch('/api/posts');
		return await response.json();
	};
	return { posts: getPosts() };
};
