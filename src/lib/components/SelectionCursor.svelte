<script lang="ts">
  let { left, top }: {
    left: string | number;
    top: string | number;
  } = $props();
</script>

<div
  class="absolute pointer-events-none z-5"
  style="left: {left}; top: {top}"
>
  <img class="z-4" src="/selection-cursor.svg" alt="selection cursor">
  <img class="absolute left top-4 scale-120 -z-3" src="/selection-cursor-background.svg" alt="selection cursor background">
</div>
