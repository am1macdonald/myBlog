<script lang="ts">
	import { page } from '$app/stores';
	import type PostData from '$lib/types/PostData';
	export let data: { post?: PostData };
	export let form: HTMLFormElement;
	export let post: PostData;

	let isScheduled = false;

	const isNew = $page.url.pathname.split('/').pop() === 'new';

	$: {
		if (data && data.post) {
			post = data.post;
		}
	}
</script>

{#if isNew}
	<h3>New Post</h3>
{/if}

<form
	bind:this={form}
	action="?/save"
	method="POST"
	enctype="multipart/form-data"
	class="container mx-auto px-4 py-8 space-y-4 max-w-2xl"
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
		<span>Textarea</span>
		<textarea
			id="post-content"
			name="post-content"
			class="textarea overflow-y-scroll h-96 resize-none"
			rows="4"
			placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			>{post?.content ?? ''}</textarea
		>
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
					<input class="input" type="date" value={post?.publishedAt} />
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
