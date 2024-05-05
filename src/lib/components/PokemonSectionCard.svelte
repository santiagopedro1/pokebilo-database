<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let title: string;
	export let description: string = '';
	export let size: 'default' | 'lg' = 'default';
</script>

<Card.Root class="space-y-4 {size === 'lg' ? 'col-span-2' : ''}">
	<Card.Header>
		<Card.Title class="text-3xl font-extrabold">{title}</Card.Title>
		{#if description}
			<Card.Description>{description}</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		<slot></slot>
	</Card.Content>
</Card.Root>
