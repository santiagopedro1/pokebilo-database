<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';
	import * as Card from '$lib/components/ui/card';

	export let name: string;
	export let pokedexNumber: number;
	export let type: Array<string>;
	export let image: string;

	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');
</script>

<a href={name}>
	<Card.Root
		class="text-center transition-colors hover:!border-white"
		style={`border-color: var(--${type[0]})`}
	>
		<Card.Header>
			<img
				src={image}
				alt="Imagem foda"
				class="w-72"
				loading="lazy"
			/>
		</Card.Header>
		<div class="flex w-full items-center justify-center gap-4">
			{#each type as type}
				<TypeBadge {type} />
			{/each}
		</div>
		<Card.Content>
			<Card.Title class="text-xl capitalize">{name}</Card.Title>
			<Card.Description>#{paddedPokedexNumber}</Card.Description>
		</Card.Content>
	</Card.Root>
</a>
