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
