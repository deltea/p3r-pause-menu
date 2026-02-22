<script lang="ts">
  import type { OptionValue } from "$lib/types";
  import { createTimeline, spring } from "animejs";
  import { onMount } from "svelte";

  let backgroundElement: HTMLDivElement;
  let { left, top, currentOption }: {
    left: number;
    top: number;
    currentOption: OptionValue;
  } = $props();

  onMount(() => {
    createTimeline({
      loop: Infinity
    }).add(backgroundElement, {
      delay: 1000,
      duration: 50,
      scale: 1.1,
    }).add(backgroundElement, {
      duration: 200,
      scale: 1,
    });
  });
</script>

<div
  class="absolute pointer-events-none z-5 origin-bottom-left translate-y-[-80%] translate-x-[-20%]"
  style="left: {left}px; top: {top + currentOption.rotation * -3}px"
  style:transform={`rotate(${currentOption.rotation + 18}deg) scaleX(${1 + currentOption.name.length * 0.08 - 0.6})`}
>
  <img class="z-10" src="/selection-cursor.svg" alt="selection cursor">
  <img
    bind:this={backgroundElement}
    class="absolute left top-4 -z-3 -rotate-4 scale-115"
    src="/selection-cursor-background.svg"
    alt="selection cursor background"
  >
</div>
