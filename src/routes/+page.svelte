<script lang="ts">
	import AdvancedFilter from '$lib/components/AdvancedFilter.svelte';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemonTypeList } = data;

	let pokemonList: Array<PokemonSpeciesData>;

	$: ({ pokemonSpeciesListPromise } = data);
	$: pokemonSpeciesListPromise.then((value) => {
		pokemonList = value;
		updatePokemonList(value);
	});

	let searchQuery = '';
	let selectedTypes: Array<string> = [];
	let radioValue = 'and';
	let sortOrder = 'numAsc';

	function updatePokemonList(allPokemonSpeciesList: Array<PokemonSpeciesData>) {
		pokemonList = allPokemonSpeciesList.filter((pokemon) => {
			const matchesSearch =
				searchQuery === '' ||
				pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pokemon.pokedexNumber.toString().includes(searchQuery);

			const matchesFilter =
				selectedTypes.length === 0 ||
				(radioValue === 'and'
					? selectedTypes.every((type) => pokemon.type1.name === type || (pokemon.type2 && pokemon.type2.name === type))
					: selectedTypes.some((type) => pokemon.type1.name === type || (pokemon.type2 && pokemon.type2.name === type)));
			return matchesSearch && matchesFilter;
		});
		switch (sortOrder) {
			case 'numAsc':
				pokemonList = pokemonList.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
				break;
			case 'numDesc':
				pokemonList = pokemonList.sort((a, b) => b.pokedexNumber - a.pokedexNumber);
				break;
			case 'nameAsc':
				pokemonList = pokemonList.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'nameDesc':
				pokemonList = pokemonList.sort((a, b) => b.name.localeCompare(a.name));
				break;
		}
	}
</script>

<svelte:head>
	<title>Pokébilo Hub</title>
</svelte:head>
{#await pokemonSpeciesListPromise}
	<img
		src="/loading-unscreen.gif"
		alt=""
	/>
{:then allPokemonSpeciesList}
	<div class="flex w-full justify-between">
		<PokemonSearch
			bind:searchQuery
			on:search={() => updatePokemonList(allPokemonSpeciesList)}
		/>
		<PokemonSort
			bind:sortOrder
			on:sort={() => updatePokemonList(allPokemonSpeciesList)}
		/>
	</div>

	<AdvancedFilter
		bind:radioValue
		bind:selectedTypes
		on:filter={() => updatePokemonList(allPokemonSpeciesList)}
		{pokemonTypeList}
	/>

	{#if pokemonList.length > 0}
		<div class="grid grid-cols-3 place-items-center gap-x-12 gap-y-8">
			{#each allPokemonSpeciesList as pokemon}
				<div class={pokemonList.includes(pokemon) ? '' : 'hidden'}>
					<PokemonCard {pokemon} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-3xl">No Pokémon found!</p>
		<img
			src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXkzOGIycmVrZ3Ewcm5yMjYwcmcxbmczYXNldzU0cTVyN3RxbHBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12Bpme5pTzGmg8/giphy.gif"
			alt="Sad pikachu gif"
		/>
	{/if}
{/await}
