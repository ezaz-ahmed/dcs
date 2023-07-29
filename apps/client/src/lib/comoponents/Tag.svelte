<script lang="ts">
	export let label: 'complete' | 'pending' | 'cancelled' | 'delete';
	export let className = '';
</script>

<div
	class={`text-md w-20 rounded-full border-1 text-center font-bold capitalize ${className}`}
	class:pending={label === 'pending'}
	class:complete={label === 'complete'}
	class:cancelled={label === 'cancelled'}
	class:delete={label === 'delete'}
>
	{label}
</div>

<style lang="postcss">
	.pending {
		@apply border-pastelPurple text-pastelPurple;
	}

	.complete {
		@apply border-robinEggBlue bg-robinEggBlue text-blueGem;
	}

	.alert {
		@apply border-scarlet bg-scarlet text-goldenFizz;
	}

	.delete {
		@apply border-pastelPurple bg-pastelPurple text-white;
	}
</style>
