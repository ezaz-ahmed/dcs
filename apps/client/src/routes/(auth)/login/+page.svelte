<script lang="ts">
	import Alert from '$lib/comoponents/Alert.svelte';
	import Loader from '$lib/comoponents/Loader.svelte';

	let fullName: string,
		email: string,
		password: string,
		confirmPassword: string,
		message: string = '',
		isSignupFormShowing: boolean = true,
		isLoading: boolean = false;

	const handleSubmit = async () => {
		isSignupFormShowing = false;
		isLoading = false;
	};
</script>

{#if isSignupFormShowing}
	<h1 class="auth-heading">Sign Up</h1>
	<Alert {message} />
	<form on:submit|preventDefault={handleSubmit}>
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
			<div class="field">
				<label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					required
					bind:value={confirmPassword}
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
{:else}
	<Alert message="Check your email for the confirmation link." />
	<a href="/login" class="auth-button block text-center">Login</a>
{/if}
