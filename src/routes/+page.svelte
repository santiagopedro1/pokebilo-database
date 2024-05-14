<script lang="ts">
	import AdvancedFilter from '$lib/components/AdvancedFilter.svelte';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';
	import { onMount } from 'svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemonTypeList } = data;

	let pokemonSpeciesList: Array<PokemonSpeciesData> = [];
	let pokemonList = pokemonSpeciesList;
	let searchQuery = ''; // State variable to store the search query
	let selectedTypes: Array<string> = []; // State variable to store the selected types for filtering
	let radioValue = 'and'; // State variable to store the selected radio value for filtering
	let sortOrder = 'numAsc'; // State variable to store the selected sort order

	function updatePokemonList() {
		pokemonList = pokemonSpeciesList.filter((pokemon) => {
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
				pokemonSpeciesList = pokemonSpeciesList.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
				return;
			case 'numDesc':
				pokemonSpeciesList = pokemonSpeciesList.sort((a, b) => b.pokedexNumber - a.pokedexNumber);
				return;
			case 'nameAsc':
				pokemonSpeciesList = pokemonSpeciesList.sort((a, b) => a.name.localeCompare(b.name));
				return;
			case 'nameDesc':
				pokemonSpeciesList = pokemonSpeciesList.sort((a, b) => b.name.localeCompare(a.name));
				return;
		}
	}
	let isLoading = true;

	onMount(async () => {
		const res = await fetch('/getPokemonList');
		const data = await res.json();
		pokemonSpeciesList = data;

		console.log(pokemonSpeciesList);

		isLoading = false;

		updatePokemonList();
	});
</script>

{#if isLoading}
	<p>I'm loading here</p>
{:else}
	<div class="flex w-full justify-between">
		<PokemonSearch
			bind:searchQuery
			on:search={updatePokemonList}
		/>
		<PokemonSort
			bind:sortOrder
			on:sort={updatePokemonList}
		/>
	</div>

	<AdvancedFilter
		bind:radioValue
		bind:selectedTypes
		on:filter={updatePokemonList}
		{pokemonTypeList}
	/>

	{#if pokemonList.length > 0}
		<div class="grid grid-cols-3 place-items-center gap-4">
			{#each pokemonSpeciesList as pokemon}
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
{/if}
