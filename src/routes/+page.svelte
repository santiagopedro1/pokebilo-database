<script lang="ts">
	import AdvancedFilter from '$lib/components/AdvancedFilter.svelte';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';
	import TypeBadge from '$lib/components/TypeBadge.svelte';

	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	import { ArrowDown, X } from 'lucide-svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let { allPokemon, allTypesNames } = data;

	let pokemonList = allPokemon;
	let searchQuery = ''; // State variable to store the search query
	let selectedTypes: Array<string> = []; // State variable to store the selected types for filtering
	let radioValue = 'and'; // State variable to store the selected radio value for filtering

	function updateDisplayedList() {
		pokemonList = allPokemon.filter((pokemon) => {
			const matchesSearch =
				searchQuery === '' ||
				pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pokemon.pokedexNumber.toString().includes(searchQuery);
			const matchesFilter =
				selectedTypes.length === 0 ||
				(radioValue === 'and'
					? selectedTypes.every((type) => pokemon.typing.includes(type))
					: selectedTypes.some((type) => pokemon.typing.includes(type)));
			return matchesSearch && matchesFilter;
		});
	}
</script>

<div class="grid grid-cols-2 place-items-center">
	<PokemonSearch
		bind:searchQuery
		on:search={updateDisplayedList}
	/>
	<PokemonSort bind:pokemonList />
</div>

<Collapsible.Root class="grid place-items-center">
	<Collapsible.Trigger>
		<Button
			variant="outline"
			size="lg"
			class="text-xl"
		>
			<span>Advanced Filters</span>
			<ArrowDown />
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="rounded-lg bg-card p-2">
		<AdvancedFilter
			bind:radioValue
			bind:selectedTypes
			on:filter={updateDisplayedList}
			{allTypesNames}
		/>
	</Collapsible.Content>
</Collapsible.Root>

<div>
	{#if selectedTypes.length > 0}
		<div class="flex justify-center gap-2">
			{#each selectedTypes as type}
				<Button
					variant="ghost"
					class="flex justify-between p-0"
					title="Remove filter"
					on:click={() => {
						selectedTypes = selectedTypes.filter((t) => t !== type);
						updateDisplayedList();
					}}
				>
					<TypeBadge {type} />
				</Button>
			{/each}
		</div>
	{:else}
		<p class="text-center">No filters applied</p>
	{/if}
</div>

{#if pokemonList.length > 0}
	<p class="text-center text-lg">{pokemonList.length} Pokémon found</p>
{/if}
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
