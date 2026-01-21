<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { HamburgerIcon, X } from '@lucide/svelte';
	import { Button } from './ui/button';
	import { fly, fade } from 'svelte/transition';
	import navbarData from '$lib/data/navbar-data';

	const isMobile = new IsMobile();
	let isOpen = $state(false);

	const toggleMenu = () => (isOpen = !isOpen);
	const closeMenu = () => (isOpen = false);
	$effect(() => {
		if (!isMobile.current) {
			isOpen = false;
		}
	});
</script>

<div class="flex items-center justify-between rounded bg-background/80 p-4">
	<h1 class="scroll-m-20 text-2xl font-semibold tracking-tight"><a href="/">Atadan Icen</a></h1>

	<div class="flex items-center gap-6">
		{#if isMobile.current}
			<Button
				onclick={toggleMenu}
				variant="outline"
				aria-label="Toggle Menu"
				class="relative z-60 p-2"
				size="icon"
			>
				{#if isOpen}
					<X />
				{:else}
					<HamburgerIcon />
				{/if}
			</Button>

			{#if isOpen}
				<div
					transition:fade={{ duration: 200 }}
					class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md"
				>
					<nav
						transition:fly={{ x: 200, duration: 300 }}
						class="flex w-full flex-col items-center gap-8 text-center text-2xl font-semibold"
					>
						{@render NavLinks()}

						<div class="mt-4">
							<ThemeToggle />
						</div>
					</nav>
				</div>
			{/if}
		{:else}
			<nav class="flex items-center gap-4">
				{@render NavLinks()}
				<div class="ml-2">
					<ThemeToggle />
				</div>
			</nav>
		{/if}
	</div>
</div>

{#snippet NavLinks()}
	{#each navbarData as item}
		<a
			href={item.href}
			class="group relative font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
			onclick={closeMenu}
		>
			{item.title}
			<span
				class="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
			></span>
		</a>
	{/each}
{/snippet}
