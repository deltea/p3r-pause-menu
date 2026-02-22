<script lang="ts">
  import type { OptionValue } from "$lib/types";

  let { left, top, currentOption }: {
    left: number;
    top: number;
    currentOption: OptionValue;
  } = $props();
</script>

<div
  class="absolute pointer-events-none z-5 origin-bottom-left translate-y-[-80%] translate-x-[-20%]"
  style="left: {left}px; top: {top + -1 * (currentOption.rotation * 3)}px"
  style:transform="rotate({currentOption.rotation + 18}deg)"
>
  <img class="z-10" src="/selection-cursor.svg" alt="selection cursor">
  <img class="absolute left top-4 scale-115 -z-3 -rotate-4" src="/selection-cursor-background.svg" alt="selection cursor background">
</div>
