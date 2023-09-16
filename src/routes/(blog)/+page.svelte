<script lang="ts">
	import FeaturePost from '$lib/components/containers/FeaturePost.svelte';
	import LatestPosts from '$lib/components/containers/LatestPosts.svelte';
	import OlderPosts from '$lib/components/containers/OlderPosts.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import type PostData from '$lib/types/PostData';

	export let data;
	let posts: PostData[];
	$: posts = data.posts;
</script>

<div
	class="h-full w-full flex flex-col justify-center items-center gap-24 bg-surface-100-800-token"
>
	<div class="h-full w-full section-container">
		<Hero>
			<svelte:fragment slot="featuredPost">
				<FeaturePost post={posts[0]}></FeaturePost>
			</svelte:fragment>
		</Hero>
	</div>
	<LatestPosts></LatestPosts>

	<OlderPosts></OlderPosts>
</div>
