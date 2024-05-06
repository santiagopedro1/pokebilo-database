<script lang="ts">
	export let type: string;
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
	{#if type === 'none'}
		<div class="flex h-7 w-[108px] items-center justify-center rounded-lg bg-secondary text-sm uppercase">
			<div class="font-bold">{type}</div>
		</div>
	{:else}
		<div class="grid grid-cols-[28px_80px] place-items-center rounded-lg bg-secondary uppercase">
			<div class="rounded-s-lg {typeBgColor[type]}">
				<img
					src={`/${type}.svg`}
					alt=""
					class="w-full"
				/>
			</div>
			<div class="rounded-e-lg p-1 text-center text-sm font-bold">{type}</div>
		</div>
	{/if}
{:else}
	<div
		class="grid place-items-center rounded-lg uppercase {typeBgColor[type]} {variant === 'lg'
			? 'grid-cols-[32px_84px] text-lg'
			: 'grid-cols-[28px_80px] text-sm'}"
	>
		<div class="rounded-s-lg">
			<img
				src={`/${type}.svg`}
				alt=""
				class="w-full"
			/>
		</div>
		<div class="rounded-e-lg text-center font-bold">{type}</div>
	</div>
{/if}
