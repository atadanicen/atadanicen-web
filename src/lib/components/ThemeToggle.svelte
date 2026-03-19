<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { MoonIcon, SunIcon } from "@lucide/svelte";
	import { mode, setMode } from "mode-watcher";

	let buttonEl: HTMLButtonElement | null = null;

	const toggleTheme = async () => {
		if (!buttonEl) return;

		const rect = buttonEl.getBoundingClientRect();

		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

		const radius = Math.hypot(
			Math.max(x, viewportWidth - x),
			Math.max(y, viewportHeight - y)
		);

		const newMode = mode.current === "dark" ? "light" : "dark";

		// fallback if unsupported
		if (!document.startViewTransition) {
			setMode(newMode);
			return;
		}

		const transition = document.startViewTransition(() => {
			setMode(newMode);
		});

		await transition.ready;

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${radius}px at ${x}px ${y}px)`
				]
			},
			{
				duration: 500,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)"
			}
		);
	};
</script>

<Button
	bind:ref={buttonEl}
	variant="ghost"
	size="icon-sm"
	onclick={toggleTheme}
	aria-label="Toggle theme"
	class="relative cursor-pointer"
>
	<SunIcon
		class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
	/>
	<MoonIcon
		class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	/>
</Button>