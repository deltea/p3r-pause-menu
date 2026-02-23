<script lang="ts">
  import type { Snippet } from "svelte";

  let { value = $bindable(true), children }: {
    value: boolean,
    children: Snippet
  } = $props();
</script>

<button
  onclick={() => (value = !value)}
  class="flex gap-8 items-center justify-between hover:bg-fg w-[32rem] py-2 px-6 rounded-md text-button-3 hover:text-muted font-skip font-bold text-2xl cursor-pointer hover:shadow-red"
>
  <span>{@render children()}</span>
  <div class="flex justify-center items-center rounded-full h-8 w-24 bg-black text-fg font-new-rodin text-xl font-normal">
    {value ? "On" : "Off"}
  </div>
</button>
