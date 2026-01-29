<script lang="ts">
	import { page } from '$app/state';
	import * as Empty from '$lib/components/ui/empty/index.js';
</script>

<div class="flex grow flex-col p-4">
	<Empty.Root>
		<Empty.Header>
			<Empty.Title>{page.status + ' ' + page.error?.message}</Empty.Title>
			<Empty.Description>The page you're looking for doesn't exist.</Empty.Description>
		</Empty.Header>
	</Empty.Root>
</div>
