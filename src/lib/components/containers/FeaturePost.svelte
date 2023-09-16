<script lang="ts">
	import { format } from 'date-fns';
	import type PostData from '$lib/types/PostData';
	import { marked } from 'marked';
	export let post: PostData;
	const summary = post.content.split('##### summary')[1];
</script>

<a class="w-fit h-fit mt-14 xs:mt-28 mb-14" href="/posts/{post.id}">
	<div
		id="post-container"
		class="h-fit lg:h-[32rem] flex flex-col lg:flex-row justify-center items-center container"
	>
		<div class="bg-surface-800 w-screen md:w-auto flex justify-center items-center">
			<div
				id="img-div"
				class="md:relative md:max-w-full-sm md:h-[32rem] md:w-[32rem] w-auto h-auto"
			>
				<img src={post.ImageURL} alt="thing" />
			</div>
		</div>
		<div
			class="h-full w-screen md:w-[32rem] lg:w-[36rem] bg-surface-50 text-surface-900 flex flex-col justify-between p-8 pt-16 pb-16 text-xl max-w-prose"
		>
			<h3 class="text-3xl">{post.title}</h3>
			{@html marked.parse(summary)}
			<span class="font-semibold text-left">{format(new Date(post.publishedDate), 'PPP')}</span>
		</div>
	</div>
</a>

<style lang="scss">
	#post-container {
		#img-div {
			@apply transition ease-in-out duration-300;
		}
		&:hover {
			#img-div {
				@apply transition ease-in-out duration-300 -translate-x-8 -translate-y-8 scale-105 shadow-2xl;
			}
		}
	}
</style>
