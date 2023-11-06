<script lang="ts">
	import type { TokenUser } from '$lib/types/UserToken';

	export let user: TokenUser;
</script>

<div class="w-full">
	<div class="pt-2 pb-2">
		<span class="text-xl"><a href="/admin/editor/new"> New Post </a> </span>
	</div>
	<ul class="flex flex-col justify-start items-start">
		<li>
			<a href="/admin/dashboard">Dashboard</a>
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
				<a href="/admin/posts">Posts</a>
			</li>
			<li>
				<a href="/admin/settings">Settings</a>
			</li>
		{/if}

		<li>
			<a href={`/profile/${user.id}`}>Profile</a>
		</li>
	</ul>
</div>
