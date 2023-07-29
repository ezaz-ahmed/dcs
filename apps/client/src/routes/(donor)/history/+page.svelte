<script lang="ts">
	import HistoryRow from '$lib/comoponents/HistoryRow.svelte';
	import Pagination from '$lib/comoponents/Pagination.svelte';
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div>
	<div class="  table-header history-table text-daisyBush">
		<h3>Status</h3>
		<h3>Date</h3>
		<h3>ID</h3>
		<h3>Description</h3>
		<h3>Amount</h3>
		<div />
	</div>

	<HistoryRow />
	<HistoryRow />
	<HistoryRow />
</div>

<div>
	<Pagination />
</div>

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}
</style>
