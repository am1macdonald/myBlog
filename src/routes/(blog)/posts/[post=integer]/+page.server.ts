import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const getPost = async () => {
		const { post } = params;
		const id = parseInt(post);
		const response = await fetch(`/api/posts/${id}`);
		if (response.status !== 200) {
			throw error(response.status, await response.json());
		}
		return await response.json();
	};
	return { post: getPost() };
};
