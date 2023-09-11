<script lang="ts">
	import type { TokenUser } from '$lib/types/UserToken';

	export let user: TokenUser;
</script>

<div class="w-full">
	<ul class="flex flex-col justify-start items-start">
		<li>
			<a href="/dashboard">Dashboard</a>
		</li>
		{#if user.role === 'ADMIN'}
			<li>
				<a href="/admin/posts">Posts</a>
			</li>
			<li>
				<a href="/admin/users">Users</a>
			</li>
			<li>
				<a href="/admin/settings">Settings</a>
			</li>
		{:else}
			<li>
				<a href="/posts">Posts</a>
			</li>
			<li>
				<a href="/users">Users</a>
			</li>
			<li>
				<a href="/settings">Settings</a>
			</li>
		{/if}

		<li>
			<a href={`/profile/${user.id}`}>Profile</a>
		</li>
	</ul>
</div>
