<script>
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppShell regionpage="relative" slotpageheader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/static" class="flex items-center">
					<img src="/images/logo.webp" alt="Logo" class="h-10 w-auto" />
					<span class="ml-2 text-xl font-bold"> Frequently Lost </span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/admin/logout">logout</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">2023© Adam MacDonald</svelte:fragment>
</AppShell>
