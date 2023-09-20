<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import NavActions from '$lib/components/layout/NavActions.svelte';
</script>

<AppShell regionpage="relative" slotpageheader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center">
					<img src="/images/logo.webp" alt="Logo" class="h-10 w-10" width="40" height="40" />
					<span class="ml-2 text-xl font-bold"> Frequently Lost </span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<NavActions />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex justify-center items-center"><span> 2023© Adam MacDonald </span></div>
	</svelte:fragment>
</AppShell>
