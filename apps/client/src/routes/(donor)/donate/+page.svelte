<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js/pure';
	import { Elements, PaymentElement } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { donationIntent } from '$lib/api';
	import Loader from '$lib/comoponents/Loader.svelte';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import { confetti } from '@neoconfetti/svelte';
	import Alert from '$lib/comoponents/Alert.svelte';

	let amount = '',
		currency: 'USD' | 'CAD' | 'EUR' = 'USD',
		description = '',
		isLoading = false,
		client_secret = '',
		showPaymentForm = false,
		processing = false,
		donationSuccess = false,
		donationFail = false,
		stripe: any,
		elements: any;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	const handleSubmit = async () => {
		if (isLoading) return;

		isLoading = true;

		let validAmount = Number(amount) * 100;

		const response = await donationIntent({ amount: validAmount, currency, description });

		if (response.status === 201) {
			client_secret = response.result?.secret!;

			showPaymentForm = true;
		} else {
			toast.error(response.error!);
		}

		isLoading = false;
	};

	const paymentSubmit = async () => {
		if (processing) return;

		processing = true;

		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		if (result.paymentIntent) {
			donationSuccess = true;
			donationFail = false;
		} else {
			donationSuccess = false;
			donationFail = true;
		}

		amount = '';
		description = '';
		showPaymentForm = false;
		processing = false;
	};
</script>

<svelte:head>
	<title>Donate Now | Donattion Hero</title>
</svelte:head>

<div class=" mt-10 md:mt-0">
	{#if donationSuccess}
		<div use:confetti={{ particleCount: 200, force: 0.3 }} />
		<Alert message="Thank Your For Your Support." />
	{/if}

	{#if donationFail}
		<Alert className=" bg-[##6B52AE] text-white" message="Something went wrong, try again later." />
	{/if}

	{#if showPaymentForm}
		<Elements
			{stripe}
			clientSecret={client_secret}
			theme="flat"
			labels="floating"
			variables={{ colorPrimary: '#7c4dff' }}
			rules={{ '.Input': { border: 'solid 1px #0002' } }}
			bind:elements
		>
			<form on:submit|preventDefault={paymentSubmit}>
				<PaymentElement />

				<button
					disabled={processing}
					class="button my-8 w-full flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
					type="submit"
				>
					{#if processing}
						<Loader /> Processing...
					{:else}
						Pay
					{/if}
				</button>
			</form>
		</Elements>
	{:else}
		<form class="grid gap-x-5" on:submit|preventDefault={handleSubmit}>
			<div class="field w-full">
				<label for="amount">Amount</label>

				<div class="relative mt-2 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span>$</span>
					</div>

					<input
						type="number"
						name="Amount"
						id="amount"
						placeholder="40"
						class=" amount pl-6"
						bind:value={amount}
						required
					/>

					<div class="absolute inset-y-0 right-0 flex items-center">
						<label for="currency" class="sr-only">Currency</label>
						<select
							id="currency"
							name="currency"
							bind:value={currency}
							class="h-full rounded-md border-0 bg-transparent"
						>
							<option>USD</option>
							<option>CAD</option>
							<option>EUR</option>
						</select>
					</div>
				</div>
			</div>

			<div class="field w-full">
				<label for="description">Description (Optional)</label>
				<textarea name="description" bind:value={description} />
			</div>

			<div class="field">
				<button
					disabled={isLoading}
					class="button w-full flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
					type="submit"
				>
					{#if isLoading}
						<Loader /> Loading
					{:else}
						Donate Now
					{/if}
				</button>
			</div>
		</form>
	{/if}
</div>

<style lang="postcss">
	.amount {
		@apply h-10 lg:h-14 w-full rounded-lg border-2 border-silver font-sansSerif text-base;
	}
</style>
