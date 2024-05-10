<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';

	export let pokemonType: [PokemonType, PokemonType | null];
	export let allTypesBasicInfo: Array<TypeBasicInfo>;

	function calculateTypeEffectiveness(types: [PokemonType, PokemonType | null], allTypes: Array<TypeBasicInfo>) {
		const effectiveness = {
			res: {
				normal: [] as string[],
				doubleRes: [] as string[]
			},
			weak: {
				normal: [] as string[],
				doubleWeak: [] as string[]
			},
			immune: [] as string[],
			normal: [] as string[]
		};

		for (const type of allTypes) {
			let mult = 1;
			for (const pokemonType of types) {
				if (pokemonType) {
					if (pokemonType.damageRelations.defensive.weak.includes(type.id)) {
						mult *= 2;
					} else if (pokemonType.damageRelations.defensive.resists.includes(type.id)) {
						mult *= 0.5;
					} else if (pokemonType.damageRelations.defensive.immune.includes(type.id)) {
						mult *= 0;
						break;
					}
				}
			}
			switch (mult) {
				case 0.25:
					effectiveness.res.doubleRes.push(type.name);
					break;
				case 0.5:
					effectiveness.res.normal.push(type.name);
					break;
				case 0:
					effectiveness.immune.push(type.name);
					break;
				case 1:
					effectiveness.normal.push(type.name);
					break;
				case 2:
					effectiveness.weak.normal.push(type.name);
					break;
				case 4:
					effectiveness.weak.doubleWeak.push(type.name);
					break;
			}
		}
		return effectiveness;
	}

	function getType(typeName: string) {
		return allTypesBasicInfo.find((type) => type.name === typeName)!;
	}

	const pokemonTypeEff = calculateTypeEffectiveness(pokemonType, allTypesBasicInfo);
	const titleMap: { [key: string]: string } = {
		res: 'Resistant to:',
		weak: 'Weak to:',
		immune: 'Immune to:',
		normal: 'Damaged normally by:'
	};
	const resMap: { [key: string]: string } = {
		normal: '½ ×',
		doubleRes: '¼ ×'
	};
	const weakMap: { [key: string]: string } = {
		normal: '2 ×',
		doubleWeak: '4 ×'
	};
</script>

<div class="grid gap-4">
	{#each Object.entries(pokemonTypeEff) as [title, effs]}
		<div class="grid grid-cols-[250px_1fr] gap-8">
			<div class="self-center justify-self-end text-xl font-bold">{titleMap[title]}</div>
			{#if Array.isArray(effs)}
				<div class="flex flex-wrap gap-4">
					{#if effs.length === 0}
						<TypeBadge variant="minimal" />
					{:else}
						{#each effs as typeName}
							<TypeBadge
								type={getType(typeName)}
								variant="minimal"
							/>
						{/each}
					{/if}
				</div>
			{:else}
				<div class="grid grid-cols-2">
					{#each Object.entries(effs) as [subTitle, subEffs]}
						<div class="grid grid-rows-[2ch_auto] items-start gap-2">
							<div class="font-bold">{'doubleRes' in effs ? resMap[subTitle] : weakMap[subTitle]}</div>
							<div class="flex flex-wrap gap-4">
								{#if subEffs.length === 0}
									<TypeBadge variant="minimal" />
								{:else}
									{#each subEffs as typeName}
										<TypeBadge
											type={getType(typeName)}
											variant="minimal"
										/>
									{/each}
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		<hr />
	{/each}
</div>
