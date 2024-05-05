<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import { Info } from 'lucide-svelte';

	export let value = '';
</script>

<div class="flex w-full items-center justify-center gap-2">
	<label for="search">Search:</label>
	<Input
		id="search"
		placeholder="Name or Pokédex number"
		class="max-w-80"
		bind:value
		on:input
	/>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Info class="size-6" />
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Search pokémon by its name or pokédex number</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
