<script lang="ts">
	export let type: string;
	export let variant: 'minimal' | 'md' | 'lg' = 'md';
</script>

{#if variant === 'minimal'}
	<div class="flex items-center text-sm uppercase">
		<img
			src={`/${type}.svg`}
			alt=""
			class="size-7 justify-self-start rounded-s-lg {type}"
		/>
		<div class="w-24 justify-self-center rounded-e-lg bg-[#272a2e] p-1 font-bold">{type}</div>
	</div>
{:else}
	<div class="flex items-center rounded-lg p-1 uppercase {type} {variant === 'lg' ? 'text-lg' : 'text-sm'}">
		<img
			src={`/${type}.svg`}
			alt=""
			class="justify-self-start {variant === 'lg' ? 'size-8' : 'size-6'}"
		/>
		<div class="justify-self-center font-bold {variant === 'lg' ? 'w-24' : 'w-20'}">{type}</div>
	</div>
{/if}
