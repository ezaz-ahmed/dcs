<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AuthLayout from '$lib/layouts/AuthLayout.svelte';
	import { isAuthenticated } from '$lib/stores/TokenStore';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($isAuthenticated) {
			goto('/donate');
		}
	});
</script>

<AuthLayout>
	<slot />
</AuthLayout>
