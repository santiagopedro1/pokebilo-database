<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const orderValues = [
		{ value: 'numAsc', label: 'Pokedex Number (Asc)' },
		{ value: 'numDesc', label: 'Pokedex Number (Desc)' },
		{ value: 'nameAsc', label: 'Name (Asc)' },
		{ value: 'nameDesc', label: 'Name (Desc)' }
	];

	export let sortOrder: string;
</script>

<div class="flex w-full items-center justify-center gap-2">
	<label for="sort">Sort by:</label>
	<Select.Root
		items={orderValues}
		selected={orderValues[0]}
		onSelectedChange={(v) => {
			if (v) sortOrder = v.value;
			dispatch('sort');
		}}
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
