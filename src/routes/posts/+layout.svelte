<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import NavActions from '$lib/components/layout/NavActions.svelte';
	import NavBrand from '$lib/components/layout/NavBrand.svelte';
</script>

<AppShell regionpage="relative" slotpageheader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<NavBrand />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<NavActions />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageFooter">2023© Adam MacDonald</svelte:fragment>
</AppShell>
