<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, key }: {
    children: Snippet,
    key: string
  } = $props();
</script>

<div class="flex gap-0.5 items-center text-3xl">
  <span class="rounded-full size-8 font-sans font-bold bg-bg-dark/80 text-xl border-3 shadow-border border-fg flex items-center justify-center">
    {key}
  </span>
  <span class="text-shadow-border">{@render children()}</span>
</div>
