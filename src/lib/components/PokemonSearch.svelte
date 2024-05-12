<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	import { createEventDispatcher } from 'svelte';

	export let searchQuery: string;

	const dispatch = createEventDispatcher();
</script>

<div class="flex w-full items-center justify-center gap-2">
	<label for="search">Search Pokémon:</label>
	<Input
		id="search"
		class="max-w-80"
		placeholder="Name or Pokédex number"
		bind:value={searchQuery}
		on:input={() => dispatch('search')}
	/>
</div>
