<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, key }: {
    children: Snippet,
    key: string
  } = $props();
</script>

<div class="flex gap-0.5 items-center text-3xl">
  <span class="rounded-full size-8 font-bold text-xl border-2 border-fg flex items-center justify-center">
    {key}
  </span>
  {@render children()}
</div>
