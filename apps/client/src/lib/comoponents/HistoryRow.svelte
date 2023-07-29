<script>
	import Trash from './Icon/Trash.svelte';
	import Tag from './Tag.svelte';

	// export let status, date, id, description, amount, currency;
</script>

<div class=" history-table items-center bg-white py-6 rounded-lg shadow-tableRow">
	<div><Tag label="pending" /></div>
	<div class=" text-lg">9/1/2202</div>
	<div class=" text-lg">24343</div>
	<div class=" text-xl font-bold line-clamp-1">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat omnis tempora. Quidem
		architecto magni cum error enim, molestiae, commodi, impedit incidunt sequi iusto nulla possimus
		sapiente minima. Eligendi in ratione assumenda repudiandae nobis. Suscipit adipisci nemo totam
		temporibus maxime!
	</div>
	<div class=" text-lg font-mono font-bold">CAD 50</div>

	<div class=" text-lg center">
		<button class=" text-pastelPurple hover:text-daisyBush">
			<Trash />
		</button>
	</div>
</div>
