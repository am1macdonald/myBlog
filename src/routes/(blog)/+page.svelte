<script lang="ts">
	import FeaturePost from '$lib/components/containers/FeaturePost.svelte';
	import LatestPosts from '$lib/components/containers/LatestPosts.svelte';
	import OlderPosts from '$lib/components/containers/OlderPosts.svelte';
</script>

<FeaturePost></FeaturePost>
<hr class="!border-t-2" />

<LatestPosts></LatestPosts>

<OlderPosts></OlderPosts>
