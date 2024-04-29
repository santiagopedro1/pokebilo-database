<script lang="ts">
	export let pokemonName: string;
	export let pokemonNumber: number;
	export let pokemonType: Array<string>;

	const paddedPokemonNumber = pokemonNumber.toString().padStart(3, '0');
</script>

<a
	class="gradient w-64 rounded-md bg-black bg-opacity-10 p-1"
	href="/#"
>
	<div class="grid place-items-center rounded-md bg-white">
		<img
			src={`/pokemons/${paddedPokemonNumber}.webp`}
			alt={pokemonName}
		/>
		<p>#{pokemonNumber} {pokemonName}</p>
		<div class="flex items-center gap-6">
			{#each pokemonType as type}
				{#if type}
					<p>{type}</p>
				{/if}
			{/each}
		</div>
	</div>
</a>

<style>
	.gradient:hover {
		background: conic-gradient(
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 10%,
			rgba(208, 222, 33, 1) 20%,
			rgba(79, 220, 74, 1) 30%,
			rgba(63, 218, 216, 1) 40%,
			rgba(47, 201, 226, 1) 50%,
			rgba(28, 127, 238, 1) 60%,
			rgba(95, 21, 242, 1) 70%,
			rgba(186, 12, 248, 1) 80%,
			rgba(251, 7, 217, 1) 90%,
			rgba(255, 0, 0, 1) 100%
		);
	}
</style>
