<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthLayout from '$lib/layouts/AuthLayout.svelte';
	import { adminAuthenticated } from '$lib/stores/AdminInfo';
	import { isAuthenticated } from '$lib/stores/TokenStore';

	import { onMount } from 'svelte';

	onMount(() => {
		if ($adminAuthenticated) {
			goto('/dashboard');
		}

		if ($isAuthenticated) {
			goto('/donate');
		}
	});
</script>

<AuthLayout>
	<slot />
</AuthLayout>
