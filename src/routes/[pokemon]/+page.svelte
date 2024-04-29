<script lang="ts">
	import { page } from '$app/stores';

	const { pokemon } = $page.data;

	// pad the pokedex number to 3 digits
	pokemon.pokedexNumber = pokemon.pokedexNumber.toString().padStart(3, '0');
</script>

<div class="grid w-full grid-cols-[auto_1fr] place-items-center">
	<img
		src={'/pokemons/' + pokemon.pokedexNumber + '.webp'}
		alt={'An image of the pokemon ' + pokemon.name}
	/>
	<div>
		<h1 class="space-x-4 text-3xl"><span class="text-gray-400">#{pokemon.pokedexNumber}</span><span>{pokemon.name}</span></h1>
	</div>
</div>
