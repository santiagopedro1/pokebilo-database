<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';

	import { Input } from '$lib/components/ui/input';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { allPokemon } = data;

	let value = '';
	let pokemon = allPokemon;

	const searchPokemon = () => {
		if (!isNaN(Number(value))) return (pokemon = allPokemon!.filter((pokemon) => pokemon.pokedexNumber.toString().includes(value)));
		else return (pokemon = allPokemon!.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase())));
	};

	$: console.log(pokemon);
</script>

<div class="space-y-3">
	<label for="search"> Search for a Pokémon </label>
	<Input
		id="search"
		placeholder="Search for a Pokémon using its name or Pokédex number"
		bind:value
		on:input={searchPokemon}
	/>
</div>

<div class="grid grid-cols-3 place-items-center gap-4">
	{#if pokemon}
		{#each pokemon as { name, pokedexNumber, typing, image }}
			<PokemonCard
				{name}
				{pokedexNumber}
				type={typing}
				{image}
			/>
		{/each}
	{:else if allPokemon}
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
