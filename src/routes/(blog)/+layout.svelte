<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import NavActions from '$lib/components/layout/NavActions.svelte';
</script>

<AppShell regionpage="relative" slotpageheader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center">
					<img src="/images/logo.webp" alt="Logo" class="h-10 w-auto" />
					<span class="ml-2 text-xl font-bold"> Frequently Lost </span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<NavActions />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight"
		><div class="bg-amber-50 w-64">
			Stuff goes in hurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
		</div></svelte:fragment
	>
	<slot />
	<svelte:fragment slot="pageFooter">2023© Adam MacDonald</svelte:fragment>
</AppShell>
