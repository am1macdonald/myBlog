<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let value;
	let input = '';
	const dispatch = createEventDispatcher();

	function onChange(): void {
		value = input;
		dispatch('inputChanged', {
			value
		});
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim">
		<img src="/icons/icon-search.svg" alt="magnifying glass" class="btn-icon-sm" />
	</div>
	<input
		class="input"
		type="search"
		name="searchBar"
		id="searchBar"
		bind:value={input}
		on:input={onChange}
		placeholder="Search..."
	/>
</div>
