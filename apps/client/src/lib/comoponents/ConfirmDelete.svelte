<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import { statusChange } from '$lib/api';
	import { invalidate } from '$app/navigation';

	export let id: number;
	export let isModalShowing = false;
	const dispatch = createEventDispatcher();

	const handleDelete = async () => {
		await statusChange(id);
		dispatch('close');
		invalidate('history:invalidate');
	};
</script>

<Modal isVisible={isModalShowing} on:close>
	<div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
		<div class="text-center text-xl font-bold text-daisyBush">
			Are you absolutely certain you want to delete this? Don't worry, it won't be gone forever. It
			will still be stored in our database.
		</div>
		<div class="flex gap-4">
			<Button
				isAnimated={false}
				label="Cancel"
				onClick={() => {
					dispatch('close');
				}}
				style="secondary"
			/>
			<Button
				isAnimated={false}
				label="Yes, Delete It"
				onClick={() => {
					handleDelete();
				}}
				style="destructive"
			/>
		</div>
	</div>
</Modal>
