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

<div class="grid grid-cols-[max-content_3ch_auto] place-items-center gap-4">
	{#each keys as key}
		<div class="justify-self-end font-extrabold">{statNameMap[key]}</div>
		<div>{stats[key]}</div>
		<Slider
			value={[stats[key]]}
			max={255}
			disabled
		/>
	{/each}
</div>
