<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import projectsData from '$lib/data/project-data';
	import type { ProjectItem } from '$lib/data/project-data';
	import { ExternalLinkIcon, GithubIcon, ImageOffIcon, SearchIcon, XIcon } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
	import Badge from './ui/badge/badge.svelte';
	import { fade, fly } from 'svelte/transition';

	// Extract unique tech stacks for filtering
	let allTechStacks = projectsData.flatMap((p) => p.techStack);
	let uniqueTechStacks = [...new Set(allTechStacks)].sort();

	// State
	let searchQuery = $state('');
	let selectedTechs = $state<string[]>([]);
	let showFeaturedOnly = $state(false);

	// Filtered projects
	let filteredProjects = $derived.by(() => {
		return projectsData.filter((project) => {
			// Filter by featured
			if (showFeaturedOnly && !project.featured) return false;

			// Filter by tech stack (OR logic - project matches ANY selected tech)
			if (selectedTechs.length > 0) {
				const hasMatchingTech = selectedTechs.some((tech) => project.techStack.includes(tech));
				if (!hasMatchingTech) return false;
			}

			// Filter by search query
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				const matchesTitle = project.title.toLowerCase().includes(query);
				const matchesDescription = project.description.toLowerCase().includes(query);
				const matchesTech = project.techStack.some((t) => t.toLowerCase().includes(query));
				const matchesBulletpoints = project.bulletpoints.some((b) =>
					b.toLowerCase().includes(query)
				);
				if (!matchesTitle && !matchesDescription && !matchesTech && !matchesBulletpoints) {
					return false;
				}
			}

			return true;
		});
	});

	// Clear all filters
	function clearFilters() {
		searchQuery = '';
		selectedTechs = [];
		showFeaturedOnly = false;
	}

	// Toggle tech stack selection
	function toggleTech(tech: string) {
		if (selectedTechs.includes(tech)) {
			selectedTechs = selectedTechs.filter((t) => t !== tech);
		} else {
			selectedTechs = [...selectedTechs, tech];
		}
	}

	// Check if any filters are active
	let hasActiveFilters = $derived(searchQuery || selectedTechs.length > 0 || showFeaturedOnly);
</script>

<section
	id="projects"
	class="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:px-8"
>
	<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Selected Works & Impact</h2>

	<p
		class="mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground dark:text-muted-foreground/80"
	>
		A collection of projects, tools, and experiments driven by curiosity and practical
		problem-solving — spanning independent products and open-source contributions.
	</p>

	<!-- Search and Filter Controls -->
	<div class="mt-12 w-full max-w-3xl">
		<!-- Search Input -->
		<div class="relative">
			<SearchIcon
				class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground/50"
			/>
			<input
				type="text"
				placeholder="Search projects by name, description, or tech..."
				bind:value={searchQuery}
				class="w-full rounded-lg border border-input bg-background py-3 pr-4 pl-12 text-sm ring-offset-background transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
			/>
			{#if searchQuery}
				<button
					onclick={() => (searchQuery = '')}
					class="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 transition-colors hover:text-foreground"
					aria-label="Clear search"
				>
					<XIcon class="h-4 w-4" />
				</button>
			{/if}
		</div>

		<!-- Filter Row -->
		<div class="mt-6 flex flex-wrap items-center justify-between gap-4">
			<!-- Featured Toggle -->
			<button
				onclick={() => (showFeaturedOnly = !showFeaturedOnly)}
				class="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all {showFeaturedOnly
					? 'border-primary bg-primary/10 text-primary'
					: 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}"
			>
				<span
					class="flex h-2 w-2 items-center justify-center rounded-full {showFeaturedOnly
						? 'bg-primary'
						: 'bg-muted-foreground/30'}"
				>
					{#if showFeaturedOnly}
						<span class="h-1 w-1 rounded-full bg-background"></span>
					{/if}
				</span>
				Featured
			</button>

			<!-- Tech Stack Pills -->
			<div class="flex flex-wrap gap-2">
				{#each uniqueTechStacks.slice(0, 8) as tech}
					<button
						onclick={() => toggleTech(tech)}
						class="rounded-full px-3 py-1 text-xs font-medium transition-all {selectedTechs.includes(
							tech
						)
							? 'bg-foreground text-background'
							: 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						{tech}
					</button>
				{/each}
			</div>
		</div>

		<!-- Active Filters Display -->
		{#if hasActiveFilters}
			<div class="mt-4 flex flex-wrap items-center gap-2">
				<span class="text-sm text-muted-foreground">Active filters:</span>
				{#if showFeaturedOnly}
					<Badge variant="secondary" class="gap-1">
						Featured
						<button onclick={() => (showFeaturedOnly = false)} class="ml-1 hover:text-destructive">
							<XIcon class="h-3 w-3" />
						</button>
					</Badge>
				{/if}
				{#each selectedTechs as tech}
					<Badge variant="secondary" class="gap-1">
						{tech}
						<button onclick={() => toggleTech(tech)} class="ml-1 hover:text-destructive">
							<XIcon class="h-3 w-3" />
						</button>
					</Badge>
				{/each}
				{#if searchQuery}
					<Badge variant="secondary" class="gap-1">
						"{searchQuery}"
						<button onclick={() => (searchQuery = '')} class="ml-1 hover:text-destructive">
							<XIcon class="h-3 w-3" />
						</button>
					</Badge>
				{/if}
				<button
					onclick={clearFilters}
					class="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
				>
					Clear all
				</button>
			</div>
		{/if}
	</div>

	<!-- Results Count -->
	<div class="mt-8 w-full text-sm text-muted-foreground">
		Showing {filteredProjects.length} of {projectsData.length} projects
	</div>

	<!-- Projects Grid -->
	<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
		{#each filteredProjects as project, index (project.id)}
			<div in:fly={{ y: 20, duration: 400, delay: index * 80 }} out:fade={{ duration: 200 }}>
				{@render ProjectCard(project)}
			</div>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<div
			class="mt-20 flex flex-col items-center justify-center text-center"
			in:fade={{ duration: 300 }}
		>
			<div class="rounded-full bg-muted/30 p-6">
				<SearchIcon class="h-10 w-10 text-muted-foreground/50" />
			</div>
			<h3 class="mt-4 text-lg font-medium">No projects found</h3>
			<p class="mt-2 max-w-sm text-sm text-muted-foreground">
				Try adjusting your filters or search query to find what you're looking for.
			</p>
			<Button variant="outline" onclick={clearFilters} class="mt-6">Clear all filters</Button>
		</div>
	{/if}
</section>

{#snippet ProjectCard(project: ProjectItem)}
	<Card.Root
		class="group flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 p-0 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
	>
		<!-- Image Section -->
		<Card.Header class="relative p-0">
			{#if project.image}
				<div class="relative overflow-hidden rounded-t-2xl bg-muted/20">
					<div
						class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					></div>
					<img
						src={project.image}
						alt={project.title}
						class="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					{#if project.featured}
						<div
							class="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg"
						>
							Featured
						</div>
					{/if}
				</div>
			{:else}
				<div class="flex h-56 w-full items-center justify-center rounded-t-2xl bg-muted/20">
					<XIcon class="h-12 w-12 text-muted-foreground/30" />
				</div>
			{/if}
		</Card.Header>

		<!-- Content Section -->
		<Card.Content class="flex flex-1 flex-col p-5">
			<!-- Title and Links -->
			<div class="flex items-start justify-between gap-3">
				<Card.Title
					class="text-xl leading-tight font-semibold text-foreground/90 transition-colors group-hover:text-foreground"
				>
					{project.title}
				</Card.Title>
				<div class="flex shrink-0 items-center gap-1">
					{#if project.githubUrl}
						<Button
							href={project.githubUrl}
							target="_blank"
							title={project.title + ' GitHub'}
							variant="ghost"
							size="sm"
							class="h-8 w-8 rounded-full p-0 hover:bg-muted"
						>
							<GithubIcon
								class="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
							/>
						</Button>{/if}

					{#if project.liveUrl}
						<Button
							href={project.liveUrl}
							target="_blank"
							title={project.title + ' Demo'}
							variant="ghost"
							size="sm"
							class="h-8 w-8 rounded-full p-0 hover:bg-muted"
						>
							<ExternalLinkIcon
								class="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
							/>
						</Button>{/if}
				</div>
			</div>

			<!-- Description -->
			<Card.Description class="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
				{project.description}
			</Card.Description>

			<!-- Bulletpoints -->
			<ul class="mt-5 space-y-2">
				{#each project.bulletpoints.slice(0, 3) as point}
					<li
						class="relative pl-4 text-sm leading-relaxed text-foreground/80 transition-colors before:absolute before:top-[0.5em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-primary/60"
					>
						{point}
					</li>
				{/each}
				{#if project.bulletpoints.length > 3}
					<li class="pl-4 text-xs text-muted-foreground">
						+{project.bulletpoints.length - 3} more highlights
					</li>
				{/if}
			</ul>

			<!-- Tech Stack -->
			<div class="mt-auto flex flex-wrap gap-1.5 pt-5">
				{#each project.techStack.slice(0, 5) as tech}
					<span
						class="rounded-md bg-secondary/60 px-2 py-0.5 text-[11px] font-medium tracking-wider text-secondary-foreground uppercase transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground"
					>
						{tech}
					</span>
				{/each}
				{#if project.techStack.length > 5}
					<span class="text-[11px] text-muted-foreground">
						+{project.techStack.length - 5}
					</span>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
{/snippet}
