<script lang="ts">
	import "./layout.css";
	import "iconify-icon";

	let { children } = $props();
</script>

<svelte:head>
	<title>Persona 3 Reload Pause Menu</title>
</svelte:head>

{@render children()}
