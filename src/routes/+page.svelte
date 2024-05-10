<script lang="ts">
	import AdvancedFilter from '$lib/components/AdvancedFilter.svelte';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let { allPokemon, allTypes } = data;

	let pokemonList = allPokemon;
	let searchQuery = ''; // State variable to store the search query
	let selectedTypes: Array<string> = []; // State variable to store the selected types for filtering
	let radioValue = 'and'; // State variable to store the selected radio value for filtering

	function updatePokemonList() {
		pokemonList = allPokemon.filter((pokemon) => {
			const matchesSearch =
				searchQuery === '' ||
				pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pokemon.pokedexNumber.toString().includes(searchQuery);

			const matchesFilter =
				selectedTypes.length === 0 ||
				(radioValue === 'and'
					? selectedTypes.every((type) => findType(pokemon.type1).name === type || (pokemon.type2 && findType(pokemon.type2).name === type))
					: selectedTypes.some(
							(type) => findType(pokemon.type1).name === type || (pokemon.type2 && findType(pokemon.type2).name === type)
						));
			return matchesSearch && matchesFilter;
		});
	}

	function findType(typeId: number) {
		const type = allTypes.find((type) => type.id === typeId);
		if (type) return type;
		else throw new Error('Type not found');
	}
</script>

<div class="grid grid-cols-2 place-items-center">
	<PokemonSearch
		bind:searchQuery
		on:search={updatePokemonList}
	/>
	<PokemonSort bind:pokemonList />
</div>

<AdvancedFilter
	bind:radioValue
	bind:selectedTypes
	on:filter={updatePokemonList}
	{allTypes}
/>

{#if pokemonList.length > 0}
	<div class="grid grid-cols-3 place-items-center gap-4">
		{#each pokemonList as pokemon}
			<PokemonCard
				{pokemon}
				type1={findType(pokemon.type1)}
				type2={(pokemon.type2 && findType(pokemon.type2)) || null}
			/>
		{/each}
	</div>
{:else}
	<div class="grid place-items-center space-y-4 text-3xl">
		<p>No Pokémon found!</p>
		<img
			src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXkzOGIycmVrZ3Ewcm5yMjYwcmcxbmczYXNldzU0cTVyN3RxbHBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12Bpme5pTzGmg8/giphy.gif"
			alt="Sad pikachu gif"
		/>
	</div>
{/if}
