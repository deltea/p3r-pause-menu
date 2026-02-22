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

  // onMount(() => {
  //   createTimeline({
  //     loop: Infinity
  //   }).add(backgroundElement, {
  //     delay: 1000,
  //     duration: 50,
  //     scale: 1.1,
  //   }).add(backgroundElement, {
  //     duration: 200,
  //     scale: 1,
  //   });
  // });
</script>

<div
  class="absolute pointer-events-none z-10 origin-bottom-left translate-y-[-80%] translate-x-[-20%]"
  style="left: {left}px; top: {top + currentOption.rotation * -3}px"
>
  <!-- <img class="z-10" src="/selection-cursor.svg" alt="selection cursor"> -->
  <svg
    width="465.17001"
    height="202.52585"
    viewBox="0 0 116.2925 50.631462"
  >
    <g transform="rotate({currentOption.rotation + 18})" transform-origin="bottom left">
      <defs>
        <clipPath id="shape-clip">
          <path
            d="M 0,50.631462 116.2925,0 95.293756,47.646877 Z"
            id="path1" />
        </clipPath>
      </defs>
      <g
      id="layer1"
      ><path
        style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.25;stroke-miterlimit:5;paint-order:stroke fill markers"
        d="M 0,50.631462 116.2925,0 95.293756,47.646877 Z"
        id="path1" /></g>

      <foreignObject x={5} y={10} width="120" height="60" clip-path="url(#shape-clip)">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <p
            class="text-2xl text-red tracking-[-0.14em] italic z-15"
            style:transform={`rotate(${currentOption.rotation}deg)`}
          >
            {currentOption.name}
          </p>
        </div>
      </foreignObject>
    </g>
  </svg>

  <!-- <img
    bind:this={backgroundElement}
    class="absolute top-4 -z-3 -rotate-4 scale-115"
    src="/selection-cursor-background.svg"
    alt="selection cursor background"
  > -->
</div>
