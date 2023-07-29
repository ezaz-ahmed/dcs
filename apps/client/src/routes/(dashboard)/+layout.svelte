<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import AdminNav from '$lib/comoponents/AdminNav.svelte';
	import { adminAuthenticated } from '$lib/stores/AdminInfo';
	import { isAuthenticated } from '$lib/stores/TokenStore';

	onMount(() => {
		if ($adminAuthenticated === false) {
			goto('/admin');
		}

		if ($isAuthenticated) {
			goto('/donate');
		}
	});
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
	<AdminNav />
	<main class="col-span-12 px-4 pt-4 md:col-span-8 md:pt-10">
		<slot />
	</main>
</div>
