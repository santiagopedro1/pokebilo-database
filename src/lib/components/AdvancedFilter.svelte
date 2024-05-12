<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';

	import * as ToggleGroup from './ui/toggle-group/';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';

	import { createEventDispatcher } from 'svelte';

	export let pokemonTypeList: Array<BasicPokemonTypeData>;

	export let selectedTypes: Array<string>;
	export let radioValue: string = 'and';

	const dispatch = createEventDispatcher();
</script>

<div class="grid place-items-center gap-2">
	<p class="text-lg">Filter by Pokémon type</p>
	<RadioGroup.Root
		class="flex gap-8"
		bind:value={radioValue}
		onValueChange={(v) => {
			if (v) radioValue = v;
			dispatch('filter');
		}}
	>
		<div class="group flex select-none items-center gap-2 text-foreground transition-all">
			<RadioGroup.Item
				id="and"
				value="and"
			/>
			<Label for="and">Include all (AND)</Label>
		</div>
		<div class="group flex select-none items-center gap-2 text-foreground transition-all">
			<RadioGroup.Item
				id="or"
				value="or"
			/>
			<Label for="or">Include any (OR)</Label>
		</div>
	</RadioGroup.Root>
	<ToggleGroup.Root
		type="multiple"
		bind:value={selectedTypes}
		class="flex flex-wrap gap-2"
		size="sm"
		onValueChange={(v) => {
			if (v) selectedTypes = v;
			dispatch('filter');
		}}
	>
		{#each pokemonTypeList as type}
			<ToggleGroup.Item value={type.name}>
				<TypeBadge
					{type}
					variant={selectedTypes.includes(type.name) ? 'default' : 'minimal'}
				/>
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
</div>
