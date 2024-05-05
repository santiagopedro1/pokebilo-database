<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = SliderPrimitive.Props;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = [0];
	export { className as class };
</script>

{#if $$restProps['orientation'] === 'horizontal'}
	<SliderPrimitive.Root
		bind:value
		class={cn('relative flex w-full touch-none select-none items-center', className)}
		{...$$restProps}
	>
		<span class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
			<SliderPrimitive.Range class="absolute h-full bg-primary" />
		</span>
	</SliderPrimitive.Root>
{:else}
	<SliderPrimitive.Root
		bind:value
		orientation="vertical"
		class={cn('relative flex h-full w-1 touch-none select-none items-center', className)}
		{...$$restProps}
	>
		<span class="relative h-full w-1.5 grow overflow-hidden rounded-full bg-primary/20">
			<SliderPrimitive.Range class="absolute w-full bg-primary" />
		</span>
	</SliderPrimitive.Root>
{/if}
