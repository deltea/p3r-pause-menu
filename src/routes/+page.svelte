<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";

  let backgroundVideo: HTMLVideoElement;

  var isStarted = $state(false);

  function start() {
    isStarted = true;
    backgroundVideo.play();
  }
</script>

<main class="h-screen w-screen relative">
  {#if !isStarted}
    <div class="fixed bg-bg size-full flex opacity-80 justify-center items-center z-10" transition:fade>
      <button onclick={start} class=" bg-fg text-bg px-4 py-3 cursor-pointer rounded">ENTER</button>
    </div>
  {/if}

  <!-- background -->
  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={backgroundVideo}
    src="/background.mp4"
    class="fixed h-full object-cover object-left -z-10"
  ></video>
</main>
