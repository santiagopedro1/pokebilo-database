<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import type { Selected } from 'bits-ui';

	const orderValues = [
		{ value: 'numAsc', label: 'Pokedex Number (Asc)' },
		{ value: 'numDesc', label: 'Pokedex Number (Desc)' },
		{ value: 'nameAsc', label: 'Name (Asc)' },
		{ value: 'nameDesc', label: 'Name (Desc)' }
	];

	export let pokemonList: Array<Pokemon>;

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
