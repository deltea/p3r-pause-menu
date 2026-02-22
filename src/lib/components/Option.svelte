<script lang="ts">
  import { cn } from "$lib/utils";
  import { onMount, type Snippet } from "svelte";
  import { animate, spring, utils } from "animejs";
  import type { OptionValue } from "$lib/types";

  const colors = [
    "text-button-1",
    "text-button-2",
    "text-button-3"
  ];

  let element: HTMLButtonElement;
  let { children, index, isSelected, onSelect, option }: {
    children: Snippet,
    index: number,
    isSelected: boolean,
    onSelect: () => void
    option: OptionValue
  } = $props();

  $effect(() => {
    if (isSelected) {
      select();
    } else {
      deselect();
    }
  })

  function select() {
    animate(element, {
      scale: 1.5,
      duration: 100,
      ease: spring({ bounce: 0.5, stiffness: 300, duration: 100 }),
      direction: "alternate"
    });
  }

  function deselect() {
    animate(element, {
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

<button
  bind:this={element}
  onmouseover={onSelect}
  onfocus={select}
  style:z-index={option.zIndex}
  id="option-{index}"
  class={cn(
    "text-7xl tracking-[-0.14em] italic cursor-pointer block relative",
    {
      [colors[(index + 2) % colors.length]]: !isSelected,
      "text-black": isSelected,
      "z-5!": isSelected,
      "font-rodin-bold": isSelected,
    }
  )}
>
  {@render children()}

  <svg width="0" height="0">
    <defs>
      <mask id="selector-mask">
        <rect width="100%" height="100%" fill="black" />
        <g transform="translate(-16.853754,-49.684265)">
          <path
            style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.25;stroke-miterlimit:5;paint-order:stroke fill markers;transform: rotate({option.rotation + 18}deg) scaleY(1) scaleX({1 + option.name.length * 0.08 - 0.6})"
            d="M 16.853754,100.31573 133.14625,49.684266 112.14751,97.331142 Z"
            id="path1" />
        </g>
      </mask>
    </defs>
  </svg>

  <div class={cn("absolute inset-0 text-red masked-text", { "hidden": !isSelected })}>
    {@render children()}
  </div>
</button>
