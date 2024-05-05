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
	{#if pokemonList}
		{#if pokemonList.length > 0}
			{#each pokemonList as { name, pokedexNumber, typing, image }}
				<PokemonCard
					{name}
					{pokedexNumber}
					type={typing}
					{image}
				/>
			{/each}
		{:else}
			<p>No Pokémon found</p>
		{/if}
	{/if}
</div>
