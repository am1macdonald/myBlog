<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import type { TokenUser } from '$lib/types/UserToken';
	import SearchBar from '$lib/components/TableSearch.svelte';

	export let data;
	let sourceData: TokenUser[];
	$: sourceData = data.users ?? [];
	let tableSimple: TableSource;
	let filteredData: TokenUser[];
	$: filteredData = sourceData ?? [];
	$: {
		tableSimple = {
			// A list of heading labels.
			head: Object.keys(sourceData[0]),
			// The data visibly shown in your table body UI.
			body: tableMapperValues(filteredData, Object.keys(sourceData[0])),
			// Optional: The data returned when interactive is enabled and a row is clicked.
			meta: tableMapperValues(sourceData, Object.keys(sourceData[0])),
			// Optional: A list of footer labels.
			foot: [
				'Total',
				'',
				`<code class="code">${filteredData.length} user ${
					filteredData.length > 1 ? 's' : ''
				}</code>`
			]
		};
	}
	const selectionHandler = (event) => {};
	const filterTerms = ({ detail }: CustomEvent) => {
		if (detail.value === '') {
			filteredData = sourceData;
			return;
		}
		const searchTerm = detail.value;
		filteredData = sourceData.filter((user) => {
			return (
				user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.userName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	};
</script>

<div class="pt-4 pl-4 pr-8 w-full flex items-center justify-between">
	<h2 class="text-4xl">User Management</h2>
</div>

<div class="w-full flex items-center justify-between pl-4 pr-8 pb-4 h-24">
	<div class="w-96">
		<SearchBar on:inputChanged={filterTerms} />
	</div>
	<a href="/" class="btn variant-filled">New User</a>
</div>

<Table interactive={true} on:selected={selectionHandler} source={tableSimple} />
