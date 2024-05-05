<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import PokemonHero from '$lib/components/PokemonHero.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon } = data;
	const { name, pokedexNumber, typing, images, stats, genus } = pokemon;

	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');

	const poke = {
		name,
		paddedPokedexNumber,
		typing,
		images,
		genus
	};
</script>

<PokemonHero {poke} />

<div class="space-y-8">
	<h2 class="text-start text-3xl font-extrabold">Type effectiveness:</h2>
	<DamageEff {typing} />
</div>
