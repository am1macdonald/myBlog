import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// matches digits or a string 'new'
	return /^(\d+|new)$/.test(param);
};
