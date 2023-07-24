<script lang="ts">
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';

	onMount(() => {
		const user = sessionStorage.getItem('user');

		if (!user) throw redirect(302, '/login');
	});
</script>

<slot />
