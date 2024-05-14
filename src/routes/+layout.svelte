<script>
	import '../app.pcss';
</script>

<header class="grid place-items-center py-4">
	<a href="/">
		<img
			src="/pokebiloHub.png"
			alt=""
			class="w-44"
		/>
	</a>
</header>
<div class="px-8">
	<hr class="w-full" />
</div>
<main class="grid place-items-center gap-8 p-4">
	<slot></slot>
</main>
