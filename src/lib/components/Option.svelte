<script lang="ts">
  import { cn } from "$lib/utils";
  import { onMount, type Snippet } from "svelte";
  import { animate, spring, utils } from "animejs";
  import type { OptionValue } from "$lib/types";

  const colors = [
    "fill-button-1",
    "fill-button-2",
    "fill-button-3"
  ];

  let element: SVGElement;
  let textElement: SVGTextElement;
  let textRedElement: SVGTextElement;

  let { children, index, isSelected, onSelect, option }: {
    children: Snippet,
    index: number,
    isSelected: boolean,
    onSelect: () => void
    option: OptionValue
  } = $props();

  const selectorPath = "M 16.853754, 100.31573 133.14625, 49.684266 112.14751, 97.331142 Z";
  const selectorMaskId = $derived(`selector-mask-${index}`);
  const selectorTransform = $derived(`translate(-60, -20) rotate(8, 0, 100) scale(${option.name.length * 0.5 + 1}, 2)`);

  $effect(() => {
    if (isSelected) {
      select();
    } else {
      deselect();
    }
  });

  function select() {
    animate([textElement, textRedElement], {
      scale: 1.5,
      duration: 100,
      ease: spring({ bounce: 0.5, stiffness: 300, duration: 100 }),
      direction: "alternate"
    });
  }

  function deselect() {
    animate([textElement, textRedElement], {
      scale: 1,
      duration: 0
    });
  }

  onMount(() => {
    utils.set(element, {
      translateX: option.offsetX,
      translateY: option.offsetY,
      rotate: option.rotation
    });
  });
</script>

<svg
  bind:this={element}
  width="850"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
  class="bgred-500/20 cursor-pointer outline-none"
  transform-origin="25% center"
  style:z-index={isSelected ? 5 : option.zIndex}
  onmouseover={onSelect}
  onfocus={onSelect}
  role="button"
  tabindex="0"
>
  <defs>
    <mask id={selectorMaskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="850" height="200">
      <rect width="100%" height="100%" fill="black" />
      <g transform={selectorTransform} transform-origin="left center">
        <path
          fill="white"
          d={selectorPath}
        />
      </g>
    </mask>
  </defs>

  {#if isSelected}
    <g transform={selectorTransform} transform-origin="left center">
      <rect width="100%" height="100%" fill="rgba(255, 0, 0, 0)" />
      <path
        class="fill-fg"
        d={selectorPath}
      />
    </g>
  {/if}

  <text
    bind:this={textElement}
    transform-origin="25% center"
    x="100"
    y="120"
    class={cn(
      "text-7xl tracking-[-0.14em] italic",
      {
        [colors[(index + 2) % colors.length]]: !isSelected,
        "text-black": isSelected,
      }
    )}
  >
    {option.name}
  </text>

  {#if isSelected}
    <g mask={`url(#${selectorMaskId})`}>
      <text
        bind:this={textRedElement}
        transform-origin="25% center"
        x="100"
        y="120"
        class="text-7xl tracking-[-0.14em] italic fill-red"
      >
        {option.name}
      </text>
    </g>
  {/if}
</svg>
