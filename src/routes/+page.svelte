<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';

	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';

	import type { PageServerData } from './$types';
	import type { Selected } from 'bits-ui';

	export let data: PageServerData;

	const { allPokemon } = data;

	const orderValues = [
		{ value: 'numAsc', label: 'Pokedex Number (Asc)' },
		{ value: 'numDesc', label: 'Pokedex Number (Desc)' },
		{ value: 'nameAsc', label: 'Name (Asc)' },
		{ value: 'nameDesc', label: 'Name (Desc)' }
	];

	let value = '';
	let pokemon = allPokemon || [];

	const searchPokemon = () => {
		if (!isNaN(Number(value))) {
			pokemon = allPokemon!.filter((pokemon) => pokemon.pokedexNumber.toString().includes(value));
		} else {
			pokemon = allPokemon!.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()));
		}
		return;
	};

	const sortPokemon = (order: Selected<string> | undefined) => {
		if (!order) return;
		const { value } = order;
		switch (value) {
			case 'numAsc':
				pokemon = pokemon.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
				return;
			case 'numDesc':
				pokemon = pokemon.sort((a, b) => b.pokedexNumber - a.pokedexNumber);
				return;
			case 'nameAsc':
				pokemon = pokemon.sort((a, b) => a.name.localeCompare(b.name));
				return;
			case 'nameDesc':
				pokemon = pokemon.sort((a, b) => b.name.localeCompare(a.name));
				return;
		}
	};
</script>

<div class="grid grid-cols-2 place-items-center">
	<div class="flex w-full items-center justify-center gap-2">
		<label for="search">Search for a Pokémon:</label>
		<Input
			id="search"
			placeholder="Search using its name or Pokédex number"
			class="max-w-80"
			bind:value
			on:input={searchPokemon}
		/>
	</div>
	<div class="flex w-full items-center justify-center gap-2">
		<label for="sort">Sort by:</label>
		<Select.Root
			items={orderValues}
			selected={orderValues[0]}
			onSelectedChange={sortPokemon}
		>
			<Select.Trigger class="max-w-80">
				<Select.Value placeholder="Order by" />
			</Select.Trigger>
			<Select.Content>
				{#each orderValues as { value, label }}
					<Select.Item {value}>{label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
</div>

<div class="grid grid-cols-3 place-items-center gap-4">
	{#if pokemon}
		{#if pokemon.length > 0}
			{#each pokemon as { name, pokedexNumber, typing, image }}
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
