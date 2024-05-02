<script lang="ts">
	import { page } from '$app/stores';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
</script>

<h1 class="text-4xl">Os pokemon mais foda</h1>

<div class="grid grid-cols-3 place-items-center gap-4">
	{#each $page.data.allPokemon as { name, pokedexNumber, type1, type2, image }}
		<PokemonCard
			{name}
			{pokedexNumber}
			type={[type1.typeName, type2 ? type2.typeName : null]}
			{image}
		/>
	{/each}
</div>
