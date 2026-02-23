<script lang="ts">
  import { cn } from "$lib/utils";
  import { onMount, type Snippet } from "svelte";
  import { animate, createTimeline, spring, utils } from "animejs";
  import type { OptionValue } from "$lib/types";

  const colors = [
    "fill-button-1",
    "fill-button-2",
    "fill-button-3"
  ];

  let element: SVGElement;
  let textElement: SVGTextElement;
  let textRedElement: SVGTextElement;
  let backgroundElement: SVGPathElement;

  let { index, isSelected, onSelect, option }: {
    index: number,
    isSelected: boolean,
    onSelect: () => void
    option: OptionValue
  } = $props();

  const selectorPath = "M 24.853754, 98.31573 135.14625, 49.684266 114.14751, 97.331142 Z";
  const selectorMaskId = $derived(`selector-mask-${index}`);
  const selectorTransform = $derived(`translate(-60, -10) rotate(8, 0, 100) scale(${option.name.replaceAll(" ", "").length * 0.5 + 1.5}, 3)`);

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

    createTimeline({
      loop: Infinity
    }).add(backgroundElement, {
      delay: 600,
      duration: 100,
      scale: 1.05,
    }).add(backgroundElement, {
      duration: 50,
      scale: 1,
    });
  });
</script>

<div class="relative pointer-events-none" style:z-index={isSelected ? 5 : option.zIndex}>
  <button
    class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-16 outline-none pointer-events-auto cursor-pointer"
    onmouseover={onSelect}
    onfocus={onSelect}
    title={option.description}
  ></button>

  <svg
    bind:this={element}
    width="950"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    class="cursor-pointer outline-none pointer-events-none"
    transform-origin="25% center"
  >
    <defs>
      <mask
        id={selectorMaskId}
        maskUnits="userSpaceOnUse"
        maskContentUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="950"
        height="200"
      >
        <rect width="100%" height="100%" fill="black" />
        <g transform={selectorTransform} transform-origin="left center">
          <path
            fill="white"
            d={selectorPath}
          />
          <path
            fill="white"
            d="M 12.7428765,100.50088 144.25712,47.499123 116.75625,95.465764 Z"
          />
        </g>
      </mask>
    </defs>

    <g transform={selectorTransform} transform-origin="left center" style:display={isSelected ? "block" : "none"}>
      <path
        bind:this={backgroundElement}
        class="fill-pink"
        transform-origin="52 100"
        d="M 12.7428765,100.50088 144.25712,47.499123 116.75625,95.465764 Z"
      />
      <path
        class="fill-fg"
        d={selectorPath}
      />
    </g>

    <text
      bind:this={textElement}
      transform-origin="25% center"
      x="150"
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
          x="150"
          y="120"
          class="text-7xl tracking-[-0.14em] italic fill-red"
        >
          {option.name}
        </text>
      </g>
    {/if}
  </svg>
</div>
