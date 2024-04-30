<script lang="ts">
	import { badgeVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(badgeVariants({ className }))}
	{...$$restProps}
>
	<slot />
</svelte:element>
