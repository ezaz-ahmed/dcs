<script lang="ts">
	import toast from 'svelte-french-toast';
	import { signup } from '$lib/api';
	import Loader from '$lib/comoponents/Loader.svelte';

	let name: string,
		email: string,
		password: string,
		isLoading: boolean = false;

	const clearInput = () => {
		name = '';
		email = '';
		password = '';
	};

	const handleSubmit = async () => {
		const data = {
			name,
			email,
			password
		};

		isLoading = true;

		const { error } = await signup(data);

		if (error) {
			toast.error(error);
			clearInput();
		}

		isLoading = false;
	};
</script>

<h1 class="auth-heading">Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
	<fieldset disabled={isLoading}>
		<div class="field">
			<label for="fullName" class="text-goldenFizz">Full Name</label>
			<input
				type="text"
				name="fullName"
				minlength={3}
				maxlength={100}
				id="name"
				required
				bind:value={name}
			/>
		</div>

		<div class="field">
			<label for="email" class="text-goldenFizz">Email Address</label>
			<input type="email" name="email" id="email" required bind:value={email} />
		</div>

		<div class="field">
			<label for="password" class="text-goldenFizz">Password</label>
			<input
				type="password"
				minlength={6}
				name="password"
				id="password"
				required
				bind:value={password}
			/>
		</div>

		<button type="submit" class="auth-button flex items-center justify-center gap-x-2">
			{#if isLoading}
				<Loader /> Loading
			{:else}
				Count me in!
			{/if}</button
		>

		<p class="mt-4 text-center text-sm text-white">
			<a href="/login" class="underline hover:no-underline">Already have an account?</a>
		</p>
	</fieldset>
</form>
