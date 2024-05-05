<script lang="ts">
	export let type: string;
	export let variant: 'minimal' | 'md' | 'lg' = 'md';

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
	{#if type === 'none'}
		<div class="flex h-7 w-[124px] items-center rounded-lg bg-[#272a2e] text-sm uppercase">
			<div class="mx-auto font-bold">{type}</div>
		</div>
	{:else}
		<div class="flex items-center text-sm uppercase">
			<img
				src={`/${type}.svg`}
				alt={type + ' type icon'}
				class="size-7 rounded-s-lg {typeBgColor[type]}"
			/>
			<div class="w-24 rounded-e-lg bg-[#272a2e] p-1 text-center font-bold">{type}</div>
		</div>
	{/if}
{:else}
	<div class="flex items-center rounded-lg p-1 uppercase {typeBgColor[type]} {variant === 'lg' ? 'text-lg' : 'text-sm'}">
		<img
			src={`/${type}.svg`}
			alt=""
			class="justify-self-start {variant === 'lg' ? 'size-8' : 'size-6'}"
		/>
		<div class="text-center font-bold {variant === 'lg' ? 'w-24' : 'w-20'}">{type}</div>
	</div>
{/if}
