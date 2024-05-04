<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';

	export let typing: {
		typeId: number;
		typeName: string;
		typeEfficaciesAgainstThisType: {
			damageTypeId: number;
			damageFactor: number;
		}[];
	}[];

	interface EffectivenessItem {
		damageTypeId: number;
		damageFactor: number;
	}

	const typeIdToName = new Map([
		[1, 'normal'],
		[2, 'fighting'],
		[3, 'flying'],
		[4, 'poison'],
		[5, 'ground'],
		[6, 'rock'],
		[7, 'bug'],
		[8, 'ghost'],
		[9, 'steel'],
		[10, 'fire'],
		[11, 'water'],
		[12, 'grass'],
		[13, 'electric'],
		[14, 'psychic'],
		[15, 'ice'],
		[16, 'dragon'],
		[17, 'dark'],
		[18, 'fairy']
	]);

	function calculateTypeEffectiveness(types: typeof typing) {
		const effectiveness: EffectivenessItem[] = [];

		for (let i = 1; i <= 18; i++) {
			let damageFactor = 1;
			for (let type of types) {
				for (let eff of type.typeEfficaciesAgainstThisType) {
					if (eff.damageTypeId === i) {
						damageFactor *= eff.damageFactor;
						break;
					}
				}
			}
			effectiveness.push({ damageTypeId: i, damageFactor });
		}

		return effectiveness;
	}

	const pokemonTypeEff = calculateTypeEffectiveness(typing);

	const weakTo = pokemonTypeEff.filter((eff) => eff.damageFactor > 1).sort((a, b) => b.damageFactor - a.damageFactor);
	const resistantTo = pokemonTypeEff.filter((eff) => eff.damageFactor < 1 && eff.damageFactor > 0).sort((a, b) => a.damageFactor - b.damageFactor);
	const immuneTo = pokemonTypeEff.filter((eff) => eff.damageFactor === 0);
	const neutralTo = pokemonTypeEff.filter((eff) => eff.damageFactor === 1);

	const typeEff = {
		'Weak to': weakTo,
		'Resistant to': resistantTo,
		'Immune to': immuneTo,
		'Damaged normally by': neutralTo
	};

	const titleText: {
		[key: number]: string;
	} = {
		0: 'Takes no damage',
		0.25: 'Takes ¼× damage',
		0.5: 'Takes ½× damage',
		1: 'Takes normal damage',
		2: 'Takes 2× damage',
		4: 'Takes 4× damage'
	};
</script>

<div class="grid gap-4">
	{#each Object.entries(typeEff) as [title, effs]}
		<div class="grid grid-cols-[250px_1fr] gap-8">
			<div class="self-center justify-self-end text-xl font-bold">{title}:</div>
			<div class="flex flex-wrap gap-4">
				{#each effs as { damageTypeId, damageFactor }}
					<div
						class="flex items-center rounded-md px-2"
						title={titleText[damageFactor]}
					>
						<TypeBadge
							variant="minimal"
							type={typeIdToName.get(damageTypeId) || 'Unknown'}
						/>
						<!-- <div
							class="{damageFactor === 1 && 'bg-gray-400 text-black'} {damageFactor === 2 && 'bg-red-500 text-black'} {damageFactor ===
								4 && 'bg-red-800'} {damageFactor === 0.5 && 'bg-green-500 text-black'} {damageFactor === 0.25 &&
								'bg-green-800'} {damageFactor === 0 && 'bg-black'} grid h-8 w-8 place-items-center rounded-full text-white"
						>
							{#if damageFactor === 0}
								0×
							{:else if damageFactor === 0.25}
								¼×
							{:else if damageFactor === 0.5}
								½×
							{:else if damageFactor === 1}
								1×
							{:else if damageFactor === 2}
								2×
							{:else if damageFactor === 4}
								4×
							{/if}
						</div> -->
					</div>
				{/each}
			</div>
		</div>
		<hr />
	{/each}
</div>
