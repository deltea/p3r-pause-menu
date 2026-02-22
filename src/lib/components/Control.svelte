<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, key }: {
    children: Snippet,
    key: string
  } = $props();
</script>

<div class="flex gap-0.5 items-center">
  <span class="rounded-full size-8 font-sans font-bold bg-bg-dark/80 outline-3 shadow-under outline-border text-xl border-3 border-fg flex items-center justify-center">
    {key}
  </span>
  <span class="text-shadow-border text-3xl font-sans tracking-tight italic">
    {@render children()}
  </span>
</div>
