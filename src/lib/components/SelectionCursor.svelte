<script lang="ts">
  let { left, top }: {
    left: string | number;
    top: string | number;
  } = $props();
</script>

<div
  class="flex justify-center items-center absolute pointer-events-none"
  style="left: {left}; top: {top}"
>
  <img src="/selection-cursor.svg" alt="selection cursor">
</div>
