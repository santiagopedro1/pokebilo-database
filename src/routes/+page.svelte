<script lang="ts">
	import { page } from '$app/stores';
	import PokemonCard from '$lib/PokemonCard.svelte';

	console.log($page.data.pokemons);
</script>

<h1 class="text-4xl">Os pokemon mais foda</h1>

<div class="grid grid-cols-3 place-items-center gap-4 px-16">
	{#each $page.data.pokemons as pokemon}
		<PokemonCard
			pokemonName={pokemon.name || 'Pokemon foda'}
			pokemonNumber={pokemon.pokedexNumber}
			pokemonType={[pokemon.type1, pokemon.type2]}
		/>
	{/each}
</div>
