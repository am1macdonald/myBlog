<script>
</script>

<div
	class="h-full w-full flex justify-center items-center bg-surface-100-800-token hero-gradient p-4"
>
	<slot name="featuredPost" />
</div>

<style lang="postcss">
	.hero-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
