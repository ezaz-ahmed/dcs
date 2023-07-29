<script lang="ts">
	import HistoryRow from '$lib/comoponents/HistoryRow.svelte';
	import Pagination from '$lib/comoponents/Pagination.svelte';

	export let data;

	const { history } = data;
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

{#if history && history.length !== 0}
	<section class=" flex flex-col justify-between min-h-[85vh] mt-10 md:mt-0">
		<div>
			<div class="  table-header history-table text-daisyBush">
				<h3>Status</h3>
				<h3>Date</h3>
				<h3>ID</h3>
				<h3 class="  hidden lg:block">Description</h3>
				<h3>Amount</h3>
				<div />
			</div>

			{#each history as dh}
				<HistoryRow
					status={dh.status}
					id={dh.id}
					description={dh.description}
					amount={dh.amount}
					currency={dh.currency}
					date={dh.date}
				/>
			{/each}
		</div>

		<div>
			{#if history.length > 5}
				<Pagination />
			{/if}
		</div>
	</section>
{:else}
	<div class=" flex items-center flex-col gap-6 justify-center min-h-[85vh]">
		<h2 class=" text-2xl font-semibold w-96 italic">
			Every great journey begins with a single step, and your first donation could be the start of
			something incredible.
		</h2>

		<a href="/donate">
			<button
				class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
				type="submit"
			>
				Donate Now
			</button>
		</a>
	</div>
{/if}

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}
</style>
