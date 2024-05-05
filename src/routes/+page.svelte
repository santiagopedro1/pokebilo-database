<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';

	import type { PageServerData } from './$types';
	import type { Selected } from 'bits-ui';

	export let data: PageServerData;

	const { allPokemon } = data;

	let value = '';
	let pokemonList = allPokemon || [];

	const searchPokemon = () => {
		if (!isNaN(Number(value))) {
			pokemonList = allPokemon!.filter((pokemon) => pokemon.pokedexNumber.toString().includes(value));
		} else {
			pokemonList = allPokemon!.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()));
		}
		return;
	};

	const sortPokemon = (order: Selected<string> | undefined) => {
		if (!order) return;
		const { value } = order;
		switch (value) {
			case 'numAsc':
				pokemonList = pokemonList.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
				return;
			case 'numDesc':
				pokemonList = pokemonList.sort((a, b) => b.pokedexNumber - a.pokedexNumber);
				return;
			case 'nameAsc':
				pokemonList = pokemonList.sort((a, b) => a.name.localeCompare(b.name));
				return;
			case 'nameDesc':
				pokemonList = pokemonList.sort((a, b) => b.name.localeCompare(a.name));
				return;
		}
	};
</script>

<div class="grid grid-cols-2 place-items-center">
	<PokemonSearch
		bind:value
		on:input={searchPokemon}
	/>
	<PokemonSort {sortPokemon} />
</div>

<div class="grid grid-cols-3 place-items-center gap-4">
	{#if pokemonList.length > 0}
		{#each pokemonList as { name, pokedexNumber, typing, image }}
			<PokemonCard
				{name}
				{pokedexNumber}
				{typing}
				{image}
			/>
		{/each}
	{:else}
		<div class="col-span-3 space-y-4 text-center text-3xl">
			<p>No Pokémon found!</p>
			<img
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXkzOGIycmVrZ3Ewcm5yMjYwcmcxbmczYXNldzU0cTVyN3RxbHBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12Bpme5pTzGmg8/giphy.gif"
				alt="Sad pikachu gif"
			/>
		</div>
	{/if}
</div>
