<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';
	import * as Card from '$lib/components/ui/card';

	export let name: string;
	export let pokedexNumber: number;
	export let type: Array<PokemonType>;
	export let image: string;

	type = type.filter(Boolean);

	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');
</script>

<a href={name}>
	<Card.Root class="transition-colors duration-200  hover:border-black">
		<Card.Content>
			<img
				src={'data:image/webp;base64,' + image}
				alt="Imagem foda"
			/>
		</Card.Content>
		<Card.Footer class="{type.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} grid place-items-center">
			{#each type as type}
				<TypeBadge {type} />
			{/each}
		</Card.Footer>
		<Card.Header class="-mt-8">
			<Card.Title class="text-xl capitalize">{name}</Card.Title>
			<Card.Description>#{paddedPokedexNumber}</Card.Description>
		</Card.Header>
	</Card.Root>
</a>
