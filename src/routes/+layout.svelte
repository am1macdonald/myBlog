<script lang="ts">
	import '../app.scss';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);
	initializeStores();
</script>

<Modal />
<slot />
