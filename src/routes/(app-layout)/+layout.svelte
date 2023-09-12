<script lang="ts">
	import { AppBar, AppShell, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/layout/sidebar/Sidebar.svelte';
	import NavLinks from '$lib/components/layout/sidebar/NavLinks.svelte';
	import SecondaryLinks from '$lib/components/layout/sidebar/SecondaryLinks.svelte';
	import type { TokenUser } from '$lib/types/UserToken';

	export let data;

	const { user }: { user: TokenUser } = data;
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
				<a href="/logout">logout</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft"
		><div id="sidebarLeft" class="w-64 h-full hidden lg:block">
			<Sidebar>
				<svelte:fragment slot="user">
					<Avatar
						border="border-4 border-surface-300-600-token hover:!border-primary-500"
						cursor="cursor-pointer"
						src={user.avatar}
						width="w-32"
						rounded="rounded-3xl"
						initials={user.name
							.split(' ')
							.map((name) => name[0])
							.join('')}
					/>
				</svelte:fragment>
				<NavLinks {user} slot="top" />
				{#if user.role !== 'ADMIN'}
					<SecondaryLinks slot="bottom" />
				{/if}
			</Sidebar>
		</div></svelte:fragment
	>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex flex-col justify-center items-center">
			<span> 2023© Adam MacDonald </span>
		</div>
	</svelte:fragment>
</AppShell>
