<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<ul class="max-sm:hidden flex justify-between gap-12 font-body font-medium">
	<li><a href="/posts">Posts</a></li>
	<li><a href="https://www.techcraftedbyadam.com/">My Work</a></li>
	<li><a href="https://github.com/am1macdonald">Github</a></li>
</ul>
<button
	type="button"
	on:click={drawerStore.open}
	class="btn-icon sm:hidden stroke-surface-50 hover:fill-surface-500"
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 0 24 24" class="icon-menu"
		><path
			class="secondary"
			fill-rule="evenodd"
			d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
		/></svg
	>
</button>
<LightSwitch />
