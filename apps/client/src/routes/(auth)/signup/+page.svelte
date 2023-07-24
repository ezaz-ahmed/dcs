<script lang="ts">
	import Alert from '$lib/comoponents/Alert.svelte';
	import Loader from '$lib/comoponents/Loader.svelte';

	let fullName: string,
		email: string,
		password: string,
		message: '',
		isLoading: boolean = false;

	const handleSubmit = async () => {
		isLoading = false;
	};
</script>

<h1 class="auth-heading">Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
	<Alert {message} />

	<fieldset disabled={isLoading}>
		<div class="field">
			<label for="fullName" class="text-goldenFizz">Full Name</label>
			<input type="text" name="fullName" id="fullName" required bind:value={fullName} />
		</div>

		<div class="field">
			<label for="email" class="text-goldenFizz">Email Address</label>
			<input type="email" name="email" id="email" required bind:value={email} />
		</div>

		<div class="field">
			<label for="password" class="text-goldenFizz">Password</label>
			<input type="password" name="password" id="password" required bind:value={password} />
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
