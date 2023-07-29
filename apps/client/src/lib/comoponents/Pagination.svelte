<script>
	import CheronLeft from './Icon/CheronLeft.svelte';
	import ChevronDown from './Icon/ChevronDown.svelte';
	import ChevronRight from './Icon/ChevronRight.svelte';
</script>

<nav aria-label="Pagination" class="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
	<a href="#" class="p-2 mr-4 rounded hover:bg-gray-100">
		<CheronLeft />
	</a>
	<a href="#" class="px-4 py-2 rounded hover:bg-gray-100"> 1 </a>
	<a href="#" class="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100">
		2
	</a> <a href="#" class="px-4 py-2 rounded hover:bg-gray-100"> 3 </a>
	<a href="#" class="px-4 py-2 rounded hover:bg-gray-100"> ... </a>
	<a href="#" class="px-4 py-2 rounded hover:bg-gray-100"> 9 </a>
	<a href="#" class="p-2 ml-4 rounded hover:bg-gray-100">
		<ChevronRight />
	</a>
</nav>
