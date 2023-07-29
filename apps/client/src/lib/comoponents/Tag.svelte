<script lang="ts">
	export let label: 'pending' | 'success' | 'cancelled' | 'deleted';
	export let className = '';
</script>

<div
	class={`text-md w-20 rounded-full border-1 text-center font-bold capitalize ${className}`}
	class:pending={label === 'pending'}
	class:success={label === 'success'}
	class:cancelled={label === 'cancelled'}
	class:deleted={label === 'deleted'}
>
	{label}
</div>

<style lang="postcss">
	.pending {
		@apply border-pastelPurple text-pastelPurple;
	}

	.success {
		@apply border-robinEggBlue bg-robinEggBlue text-blueGem;
	}

	.alert {
		@apply border-scarlet bg-scarlet text-goldenFizz;
	}

	.deleted {
		@apply border-pastelPurple bg-pastelPurple text-white;
	}
</style>
