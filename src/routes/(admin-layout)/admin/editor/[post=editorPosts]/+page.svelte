<script lang="ts">
	import { page } from '$app/stores';
	import type PostData from '$lib/types/PostData';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	export let data: { post?: PostData };
	export let form: HTMLFormElement;
	export let post: PostData;
	import EasyMDE from 'easymde';

	let isScheduled = false;

	const isNew = $page.url.pathname.split('/').pop() === 'new';
	let easymde: EasyMDE;
	let content: HTMLDivElement;
	if (browser) {
		onMount(async () => {
			easymde = new EasyMDE({ element: content });
		});
	}

	$: {
		if (data && data.post) {
			post = data.post;
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-4 max-w-2xl">
	<h3 class="text-6xl font-display">
		{#if isNew}
			New Post
		{:else}
			Edit Post
		{/if}
	</h3>
</div>

<form
	bind:this={form}
	action="?/save"
	method="POST"
	enctype="multipart/form-data"
	class="container mx-auto px-4 space-y-4 max-w-2xl"
>
	<label class="label" for="post-title">
		<span>Title</span>
		<input
			value={post?.title ?? ''}
			class="input"
			type="text"
			id="post-title"
			name="post-title"
			placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			required
		/>
	</label>

	<label class="label" for="post-content">
		<textarea name="post-content" id="post-content"></textarea>
	</label>

	{#if !post?.isPublished}
		<div>
			<label class="label flex justify-start items-center gap-12 space-x-2" for="post-content">
				<p>Schedule Release</p>
				<input bind:checked={isScheduled} class="checkbox" type="checkbox" />
			</label>
			{#if isScheduled}
				<label class="label" for="post-content">
					<span>Release Date</span>
					<input class="input" type="date" value={post?.publishedDate} />
				</label>
			{/if}
		</div>
	{/if}

	<label for="post-image">
		<span>Post Image</span>
		<input
			class="input"
			type="file"
			id="post-image"
			name="post-image"
			accept="image/png, image/jpeg"
			required
		/>
	</label>

	<button type="submit" class="btn variant-filled">Save</button>
</form>

<style>
	:host {
		@apply flex flex-col items-center justify-center;
	}
</style>
