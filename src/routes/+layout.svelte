<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import './layout.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import Particles from '$lib/components/Particles.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>atadanicen</title>
	<link rel="icon" type="image/svg+xml" href="/images/ai-icon.svg" />
</svelte:head>
<ModeWatcher />
<div class="flex min-h-screen flex-col font-custom">
	<Particles
		className="absolute inset-0 -z-20"
		refresh={true}
		quantity={200}
		size={0.8}
		color={mode.current === 'dark' ? '#ffffff' : '#000000'}
	/>
	<Navbar />
	{@render children()}
	<Footer />
</div>
