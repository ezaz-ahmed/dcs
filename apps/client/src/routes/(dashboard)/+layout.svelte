<script lang="ts">
	import { onMount } from 'svelte';
	import Snackbar from '$lib/comoponents/Snackbar.svelte';
	import Navbar from '$lib/comoponents/Navbar.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/TokenStore';

	onMount(() => {
		if ($isAuthenticated === false) {
			goto('/login');
		}
	});
</script>

<Snackbar />

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
	<Navbar />
	<main class="col-span-12 px-4 pt-4 md:col-span-8 md:pt-10">
		<slot />
	</main>
</div>

<slot />
