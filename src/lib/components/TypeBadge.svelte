<script lang="ts">
	export let type: { name: string; icon: string } | undefined = undefined;
	export let variant: 'minimal' | 'default' | 'lg' = 'default';

	const typeBgColor: { [key: string]: string } = {
		normal: 'bg-types-normal',
		fighting: 'bg-types-fighting',
		flying: 'bg-types-flying',
		poison: 'bg-types-poison',
		ground: 'bg-types-ground',
		rock: 'bg-types-rock',
		bug: 'bg-types-bug',
		ghost: 'bg-types-ghost',
		steel: 'bg-types-steel',
		fire: 'bg-types-fire',
		water: 'bg-types-water',
		grass: 'bg-types-grass',
		electric: 'bg-types-electric',
		psychic: 'bg-types-psychic',
		ice: 'bg-types-ice',
		dragon: 'bg-types-dragon',
		dark: 'bg-types-dark',
		fairy: 'bg-types-fairy'
	};
</script>

{#if variant === 'minimal'}
	{#if !type}
		<div class="flex h-8 w-[112px] items-center justify-center rounded-lg bg-secondary">
			<div class="text-sm font-bold uppercase">none</div>
		</div>
	{:else}
		<div class="grid grid-cols-[32px_80px] place-items-center rounded-lg bg-secondary uppercase">
			<div class="rounded-s-lg {typeBgColor[type.name]}">
				<img
					src={type.icon}
					alt=""
					class="w-full p-1"
				/>
			</div>
			<div class="rounded-e-lg text-center text-sm font-bold">{type.name}</div>
		</div>
	{/if}
{:else if type}
	<div
		class="grid place-items-center rounded-lg uppercase {typeBgColor[type.name]} {variant === 'lg'
			? 'grid-cols-[32px_1fr] text-lg'
			: 'grid-cols-[32px_80px] text-sm'}"
	>
		<div class="rounded-s-lg">
			<img
				src={type.icon}
				alt=""
				class="w-full p-1"
			/>
		</div>
		<div class="rounded-e-lg px-2 py-1 text-center font-bold">{type.name}</div>
	</div>
{/if}
