<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import TypeBadge from '$lib/components/TypeBadge.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon, allTypes } = data;
	const { name, pokedexNumber, image, type1, type2 } = pokemon;
	const types = type2 ? [type1, type2] : [type1];
	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');
</script>

<div class="grid w-full grid-cols-[auto_1fr] place-items-center">
	<img
		src={'data:image/webp;base64,' + image}
		alt={'An image of the pokemon ' + name}
	/>
	<div class="grid place-items-center gap-4">
		<div class="flex items-center gap-3 text-3xl">
			<span class="text-gray-400">#{paddedPokedexNumber}</span>
			<h1 class="capitalize">{name}</h1>
		</div>
		<div class="{types.length === 1 ? 'grid-cols-1' : ' grid-cols-2'} grid gap-4">
			{#each types as { typeName }}
				<TypeBadge
					variant="lg"
					type={typeName}
				/>
			{/each}
		</div>
	</div>
</div>

<div class="space-y-8">
	<h2 class="text-start text-3xl font-extrabold">Type effectiveness:</h2>
	<DamageEff
		{types}
		{allTypes}
	/>
</div>
