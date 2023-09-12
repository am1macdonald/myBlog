<script lang="ts">
</script>

<div
	class="bg-surface-50-900-token h-full w-full flex flex-col justify-evenly items-center p-8 overflow-y-auto"
>
	<slot name="user" />
	<div class="h-full">
		<slot name="top" />
		<slot name="middle" />
		<slot name="bottom" />
	</div>
</div>
