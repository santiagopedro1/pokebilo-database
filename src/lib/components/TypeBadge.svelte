<script lang="ts">
	export let type: string;
	export let variant: 'minimal' | 'md' | 'lg' = 'md';
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
				class="size-7 justify-self-start rounded-s-lg"
				style={'background-color: var(--{type})'}
			/>
			<div class="w-24 rounded-e-lg bg-[#272a2e] p-1 text-center font-bold">{type}</div>
		</div>
	{/if}
{:else}
	<div
		class="flex items-center rounded-lg p-1 uppercase {variant === 'lg' ? 'text-lg' : 'text-sm'}"
		style={`background-color: var(--${type})`}
	>
		<img
			src={`/${type}.svg`}
			alt=""
			class="justify-self-start {variant === 'lg' ? 'size-8' : 'size-6'}"
		/>
		<div class="text-center font-bold {variant === 'lg' ? 'w-24' : 'w-20'}">{type}</div>
	</div>
{/if}
