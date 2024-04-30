<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';
	import * as Card from '$lib/components/ui/card';

	export let pokemonName: string;
	export let pokemonNumber: number;
	export let pokemonType: Array<PokemonType>;

	pokemonType = pokemonType.filter(Boolean);

	const paddedPokemonNumber = pokemonNumber.toString().padStart(3, '0');
</script>

<a href={pokemonName}>
	<Card.Root>
		<Card.Content>
			<img
				src={`/pokemons/${paddedPokemonNumber}.webp`}
				alt={pokemonName}
			/>
		</Card.Content>
		<Card.Footer class="{pokemonType.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} grid place-items-center">
			{#each pokemonType as type}
				<TypeBadge {type} />
			{/each}
		</Card.Footer>
		<Card.Header class="-mt-8">
			<Card.Title class="text-xl capitalize">{pokemonName}</Card.Title>
			<Card.Description>#{paddedPokemonNumber}</Card.Description>
		</Card.Header>
	</Card.Root>
</a>
