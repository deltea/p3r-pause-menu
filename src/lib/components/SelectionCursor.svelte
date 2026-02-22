<script lang="ts">
  import type { OptionValue } from "$lib/types";

  let { left, top, currentOption }: {
    left: number;
    top: number;
    currentOption: OptionValue;
  } = $props();
</script>

<div
  class="absolute pointer-events-none z-5"
  style="left: {left + currentOption.name.length * 6 - 40}px; top: {top}px"
  style:transform="rotate({currentOption.rotation + 15}deg) scaleX({currentOption.name.length * 0.15 + 0.3}) scaleY({currentOption.name.length * 0.1 + 0.3})"
>
  <img class="z-10" src="/selection-cursor.svg" alt="selection cursor">
  <img class="absolute left top-4 scale-115 -z-3 -rotate-4" src="/selection-cursor-background.svg" alt="selection cursor background">
</div>
