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
    <div class="fixed bg-bg/80 size-full flex flex-col gap-32 justify-center items-center z-10" transition:fade>
      <h1 class="bg-fg text-bg px-6 py-4 cursor-pointer rounded text-6xl rotate-4">PERSONA 3 PAUSE MENU</h1>
      <button onclick={start} class="text-6xl flex gap-4">
        <span>ENTER</span>
        <iconify-icon icon="mdi:arrow-right-bold" class=" text-6xl"></iconify-icon>
      </button>
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
