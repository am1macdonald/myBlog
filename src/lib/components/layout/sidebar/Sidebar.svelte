<script lang="ts">
</script>

<div class="h-full w-full bg-amber-600 flex flex-col justify-evenly items-center p-8">
	<slot name="top" />
	<slot name="middle"><div class="h-1/3"></div></slot>
	<slot name="bottom"><div class="h-1/3"></div></slot>
</div>
