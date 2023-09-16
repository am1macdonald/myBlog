<script>
</script>

<div
	class="h-full w-full flex justify-center items-center bg-surface-100-800-token hero-gradient svelte-1fg2m4z"
>
	<slot name="featuredPost" />
</div>

<style lang="postcss">
	.hero-gradient.svelte-1fg2m4z {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
