<script lang="ts">
  let { left, top, rotation, scale }: {
    left: string | number;
    top: string | number;
    rotation: number;
    scale: number;
  } = $props();
</script>

<div
  class="absolute pointer-events-none z-5"
  style="left: {left}; top: {top}"
  style:transform="rotate({rotation + 15}deg) scaleX({scale}) scaleY({scale * 0.5 + 0.25})"
>
  <img class="z-10" src="/selection-cursor.svg" alt="selection cursor">
  <img class="absolute left top-4 scale-120 -z-3" src="/selection-cursor-background.svg" alt="selection cursor background">
</div>
