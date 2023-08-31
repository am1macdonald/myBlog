<script>
	import '../app.scss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import NavActions from "$lib/components/NavActions.svelte";
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			Frequently Lost
			<svelte:fragment slot="trail">
				<NavActions />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		2023© Adam MacDonald
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
