<script lang="ts">
    import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  let { value = $bindable(true), isSelected, onSelect, children }: {
    value: boolean,
    isSelected: boolean,
    onSelect: () => void
    children: Snippet,
  } = $props();
</script>

<button
  onclick={() => (value = !value)}
  onmouseenter={onSelect}
  onfocus={onSelect}
  class={cn("flex gap-8 items-center justify-between w-[32rem] py-2 px-6 rounded-md font-skip font-bold text-2xl cursor-pointer", {
    "bg-fg text-bg text-muted": isSelected,
    "text-button-3": !isSelected
  })}
>
  <span>{@render children()}</span>
  <div class="flex justify-center items-center rounded-full h-8 w-24 bg-black text-fg font-new-rodin text-xl font-normal">
    {value ? "On" : "Off"}
  </div>
</button>
