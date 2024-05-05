<script lang="ts">
	import { Slider } from './ui/slider/';
	export let stats: {
		hp: number;
		attack: number;
		defense: number;
		specialAttack: number;
		specialDefense: number;
		speed: number;
	};

	const keys: ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'] = [
		'hp',
		'attack',
		'defense',
		'specialAttack',
		'specialDefense',
		'speed'
	];
	const statNameMap = {
		hp: 'HP',
		attack: 'Attack',
		defense: 'Defense',
		specialAttack: 'Sp. Atk',
		specialDefense: 'Sp. Def',
		speed: 'Speed'
	};
</script>

<div class="grid grid-cols-6 place-items-center gap-4">
	{#each keys as key}
		<div class="flex flex-col items-center">
			<Slider
				value={[stats[key]]}
				max={255}
				orientation="vertical"
				class="h-32"
			/>
			<div class="mt-2 grid grid-rows-2 text-center">
				<div class="font-extrabold">{statNameMap[key]}</div>
				<div>{stats[key]}</div>
			</div>
		</div>
	{/each}
</div>
