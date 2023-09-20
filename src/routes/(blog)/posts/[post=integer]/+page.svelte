<script lang="ts">
	import type PostData from '$lib/types/PostData';
	import { marked } from 'marked';
	import { format } from 'date-fns';

	export let data;
	let post: PostData;
	$: post = data.post;
	let paragraphs: string[] = [];
	$: {
		paragraphs = post.content?.split('##### summary')[0].split('\\n\\n');
	}
</script>

<div class="flex flex-col justify-center items-center gap-6 lg:gap-10 p-2 lg:p-24">
	<div class="max-w-xl">
		<img
			src={post.imageURL}
			class="md:h-[32rem] md:w-[32rem]"
			alt="a robot thrusting a bottle of oil toward the viewer"
		/>
	</div>
	<hr />
	<div class="font-display text-3xl max-w-xl">
		<hr class="w-full border-2 border-primary-900-50-token mb-4" />
		{@html marked(post.title)}
	</div>
	<div class="w-full max-w-prose">
		<a
			href="/{post.name
				.split(' ')
				.map((x) => x.toLowerCase())
				.join('')}"
		>
			<p class="font-semibold">{post.name}</p>
		</a>
		<p class="font-semibold">
			{format(new Date(post.publishedDate), 'PPP')}
		</p>
		<hr class="w-full border-2 border-primary-900-50-token mt-4" />
	</div>
	<div class="flex flex-col gap-4 text-base max-w-prose leading-relaxed content">
		{#each paragraphs as para}
			{@html marked(para)}
		{/each}
	</div>
</div>
