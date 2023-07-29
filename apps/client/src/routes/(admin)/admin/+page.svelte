<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/AdminApi';
	import Loader from '$lib/comoponents/Loader.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let username: string,
		password: string,
		isLoading: boolean = false;

	const clearInput = () => {
		username = '';
		password = '';
	};

	const handleSubmit = async () => {
		const data = {
			username,
			password
		};

		isLoading = true;

		const { error } = await login(data);

		if (error) {
			clearInput();
			toast.error(error);
		} else {
			goto('/donate');
		}

		isLoading = false;
	};
</script>

<h1 class="auth-heading">Login</h1>

<Toaster />

<form on:submit|preventDefault={handleSubmit}>
	<fieldset disabled={isLoading}>
		<div class="field">
			<label for="username" class="text-goldenFizz">User Name </label>
			<input type="text" name="username" placeholder="user name" bind:value={username} />
		</div>

		<div class="field">
			<div class="flex justify-between">
				<label for="password" class="text-goldenFizz">Password</label>
			</div>
			<input type="password" placeholder="Your password" bind:value={password} />
		</div>

		<div class="field">
			<button type="submit" class="auth-button flex items-center justify-center gap-x-2">
				{#if isLoading}
					<Loader /> Loading
				{:else}
					Let's do this!
				{/if}
			</button>
		</div>
	</fieldset>
</form>
