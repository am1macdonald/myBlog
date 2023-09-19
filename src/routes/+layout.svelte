<script lang="ts">
	import '../app.scss';
	import { Drawer, getDrawerStore, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	storeHighlightJs.set(hljs);
	initializeStores();
	const drawer = getDrawerStore();
</script>

<svelte:head>
	<title>Frequently Lost</title>
	<meta
		name="description"
		content="A candid dive into web development, personal musings, and tech adventures. From Svelte Kit to embedded programming, experience the raw journey of a developer unfiltered."
	/>
	<meta
		name="keywords"
		content="web development, Svelte Kit, coding journey, embedded programming, blog, tech rants"
	/>
	<meta property="og:title" content="Frequently Lost - Web Development etc." />
	<meta
		property="og:description"
		content="Join the coding journey, from tackling Svelte Kit to navigating the nuances of embedded programming. Raw, real, and always insightful."
	/>
	<!--	<meta property="og:image" content="URL_TO_YOUR_BLOG_PREVIEW_IMAGE_HERE">-->
	<meta property="og:url" content="https://www.frequentlylost.com" />
</svelte:head>

<Drawer position="bottom" height="h-fit">
	<ul class="flex flex-col h-full w-full">
		<a href="/" on:click={drawer.close}>
			<li class="drawer-list-item">Home</li>
		</a>
		<a href="/posts" on:click={drawer.close}>
			<li class="drawer-list-item">Posts</li>
		</a>
		<a href="https://www.techcraftedbyadam.com/" on:click={drawer.close}>
			<li class="drawer-list-item">My Work</li>
		</a>
		<a href="https://github.com/am1macdonald" on:click={drawer.close}>
			<li class="drawer-list-item">Github</li>
		</a>
	</ul>
</Drawer>
<Modal />
<slot />

<style lang="postcss">
	.drawer-list-item {
		@apply text-4xl text-center p-7 hover:bg-surface-700-200-token hover:text-primary-500-400-token;
	}
	a:not(:last-child) .drawer-list-item {
		@apply border-b-2 border-gray-200;
	}
</style>
