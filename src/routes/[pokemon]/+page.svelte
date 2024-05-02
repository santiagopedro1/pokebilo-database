<script lang="ts">
	// import DamageEff from '$lib/components/DamageEff.svelte';
	import TypeBadge from '$lib/components/TypeBadge.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon, allTypes } = data;
	const { name, pokedexNumber, image, type1, type2 } = pokemon;
	const types = type2 ? [type1, type2] : [type1];
	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');

	interface EffectivenessItem {
		damageTypeId: number;
		damageFactor: number;
	}

	function calculateTypeEffectiveness(
		types: {
			typeId: number;
			typeName: string;
			typeEfficaciesAgainstThisType: {
				damageTypeId: number;
				damageFactor: number;
			}[];
		}[]
	) {
		const effectiveness: EffectivenessItem[] = [];

		for (let i = 1; i <= 18; i++) {
			let damageFactor = 1;
			for (let type of types) {
				for (let eff of type.typeEfficaciesAgainstThisType) {
					if (eff.damageTypeId === i) {
						damageFactor *= eff.damageFactor / 100;
						break;
					}
				}
			}
			effectiveness.push({ damageTypeId: i, damageFactor });
		}

		return effectiveness;
	}

	const pokemonTypeEff = calculateTypeEffectiveness(types);

	const weakTo = pokemonTypeEff.filter((eff) => eff.damageFactor > 1);
	const resistantTo = pokemonTypeEff.filter((eff) => eff.damageFactor < 1);
	const immuneTo = pokemonTypeEff.filter((eff) => eff.damageFactor === 0);
	const neutralTo = pokemonTypeEff.filter((eff) => eff.damageFactor === 1);
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
					size="lg"
					type={typeName}
				/>
			{/each}
		</div>
	</div>
</div>

<div>
	<h2>Type effectiveness:</h2>
	<p>Under normal battle conditions in Generation IX, this Pokémon is:</p>
	<div class="grid grid-rows-4">
		<div class="grid grid-cols-2 place-items-center">
			<h3>Weak to:</h3>
			<ul class="flex flex-wrap items-center justify-center gap-4">
				{#each weakTo as { damageTypeId, damageFactor }}
					<li class="capitalize">{allTypes[damageTypeId - 1].typeName} ({damageFactor})</li>
				{/each}
			</ul>
		</div>
		<div class="grid grid-cols-2 place-items-center">
			<h3>Resistant to:</h3>
			<ul class="flex flex-wrap items-center justify-center gap-4">
				{#each resistantTo as { damageTypeId, damageFactor }}
					<li class="capitalize">{allTypes[damageTypeId - 1].typeName} ({damageFactor})</li>
				{/each}
			</ul>
		</div>
		<div class="grid grid-cols-2 place-items-center">
			<h3>Immune to:</h3>
			<ul class="flex flex-wrap items-center justify-center gap-4">
				{#each immuneTo as { damageTypeId, damageFactor }}
					<li class="capitalize">{allTypes[damageTypeId - 1].typeName} ({damageFactor})</li>
				{/each}
			</ul>
		</div>
		<div class="grid grid-cols-2 place-items-center">
			<h3>Neutral to:</h3>
			<ul class="flex flex-wrap items-center justify-center gap-4">
				{#each neutralTo as { damageTypeId, damageFactor }}
					<li class="capitalize">{allTypes[damageTypeId - 1].typeName} ({damageFactor})</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
