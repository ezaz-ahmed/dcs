<script lang="ts">
	import { convertDate } from '$lib/utils/dateHelpers';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import Trash from './Icon/Trash.svelte';
	import Tag from './Tag.svelte';

	let isAdditionalMenuShowing = false;
	let isModalShowing = false;

	const handleDelete = () => {
		isModalShowing = true;
		isAdditionalMenuShowing = false;
	};

	export let status: 'complete' | 'pending' | 'cancelled' | 'delete',
		date: string,
		id: number,
		description: string | null,
		amount: number,
		currency: 'USD' | 'EUR' | 'CAD';
</script>

<ConfirmDelete {id} {isModalShowing} on:close={() => (isModalShowing = false)} />

<div class=" history-table items-center bg-white py-6 rounded-lg shadow-tableRow">
	<div><Tag label={status} /></div>
	<div class=" text-lg">{convertDate(date)}</div>
	<div class=" text-lg">{id}</div>
	<div class=" text-xl font-bold line-clamp-1 hidden lg:block">
		{description}
	</div>
	<div class=" text-lg font-mono font-bold">{currency} {amount}</div>

	<div class=" text-lg center">
		<button on:click={handleDelete} class=" text-pastelPurple hover:text-daisyBush">
			<Trash />
		</button>
	</div>
</div>
