<script lang="ts">
    import type { PageData } from '$lib/types';
    import FeaturePost from "$lib/components/FeaturePost.svelte";
    import LatestPosts from "$lib/components/LatestPosts.svelte";

    export let data: PageData;
</script>

<FeaturePost></FeaturePost>
<hr class="!border-t-2" />

<LatestPosts></LatestPosts>
<div></div>
