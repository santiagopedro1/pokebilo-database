<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import { Info } from 'lucide-svelte';

	import { createEventDispatcher } from 'svelte';

	export let searchQuery: string;

	const dispatch = createEventDispatcher();
</script>

<div class="flex w-full items-center justify-center gap-2">
	<label for="search">Search Pokémon:</label>
	<Input
		id="search"
		class="max-w-80"
		bind:value={searchQuery}
		on:input={() => dispatch('search')}
	/>
	<Tooltip.Root>
		<Tooltip.Trigger class="cursor-help">
			<Info class="size-6" />
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Search pokémon by its name or pokédex number</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
