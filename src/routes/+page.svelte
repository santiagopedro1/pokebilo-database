<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { allPokemon } = data;
</script>

<h1 class="text-4xl">Os pokemon mais foda</h1>

<div class="grid grid-cols-3 place-items-center gap-4">
	{#if allPokemon}
		{#each allPokemon as { name, pokedexNumber, typing, image }}
			<PokemonCard
				{name}
				{pokedexNumber}
				type={typing}
				{image}
			/>
		{/each}
	{/if}
</div>
