import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './my-custom-theme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {},
		fontFamily: {
			display: ['LibreBaskerville', 'Georgia', 'serif'],
			body: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
			sans: ['OpenSans']
		}
	},
	plugins: [
		forms,
		skeleton({
			themes: { custom: [myCustomTheme] }
		})
	]
} satisfies Config;
export default config;
