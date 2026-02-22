<script lang="ts">
  import { cn } from "$lib/utils";
  import { type Snippet } from "svelte";
  import { animate, spring } from "animejs";

  const colors = [
    "text-button-1",
    "text-button-2",
    "text-button-3"
  ];

  let element: HTMLButtonElement;
  let { children, index, isSelected, onSelect, rotation, zIndex, offsetX, offsetY }: {
    children: Snippet,
    index: number,
    isSelected: boolean,
    onSelect: () => void,
    rotation: number,
    zIndex: number,
    offsetX: number,
    offsetY: number
  } = $props();

  $effect(() => {
    if (!isSelected) {
      deselect();
    }
  })

  function select() {
    onSelect();
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
</script>

<button
  bind:this={element}
  onmouseover={select}
  onfocus={select}
  style:transform={`rotate(${rotation}deg)`}
  style:z-index={zIndex}
  style:clip-path="url(#selectionCursor)"
  class={cn(
    "text-8xl tracking-[-0.14em] italic cursor-pointer clip",
    {
      [colors[(index + 2) % colors.length]]: !isSelected,
      "text-black": isSelected,
      "z-5!": isSelected,
      "font-rodin-bold": isSelected,
    }
  )}
>
  {@render children()}
</button>
