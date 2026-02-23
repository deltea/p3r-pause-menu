<script lang="ts">
  import Option from "$lib/components/Option.svelte";
  import { fade } from "svelte/transition";
  import type { OptionValue } from "$lib/types";
  import { onMount } from "svelte";
  import Control from "$lib/components/Control.svelte";

  const options: OptionValue[] = [
    { name: "SKILL", description: "Use a Skill", rotation: -25, zIndex: 1, offsetX: -60, offsetY: 55 },
    { name: "ITEM", description: "View/Use Items", rotation: -15, zIndex: 0, offsetX: 0, offsetY: 30 },
    { name: "EQUIP", description: "View/Change Equipment", rotation: -20, zIndex: 1, offsetX: -50, offsetY: 35 },
    { name: "PERSONA", description: "View/Change Personas", rotation: -15, zIndex: 2, offsetX: -80, offsetY: 40 },
    { name: "STATS", description: "View Stats/Organize Party", rotation: 0, zIndex: 0, offsetX: 0, offsetY: 15 },
    { name: "QUEST", description: "View Requests", rotation: -14, zIndex: 1, offsetX: -40, offsetY: 20 },
    { name: "SOCIAL LINK", description: "View Social Links", rotation: -8, zIndex: 2, offsetX: -20, offsetY: 20 },
    { name: "CALENDAR", description: "View Calendar", rotation: -5, zIndex: 1, offsetX: -60, offsetY: 10 },
    { name: "SYSTEM", description: "View Settings", rotation: 8, zIndex: 0, offsetX: 0, offsetY: 0 }
  ]

  let backgroundVideo: HTMLVideoElement;
  let isStarted = $state(false);
  let selectedIndex = $state(0);
  let currentOptionElement = $state<HTMLButtonElement>();

  function setIndex(index: number) {
    selectedIndex = index;
    currentOptionElement = document.getElementById(`option-${index}`) as HTMLButtonElement;
  }

  function start() {
    isStarted = true;
    backgroundVideo.play();
  }

  onMount(() => {
    setIndex(0);
  });
</script>

<main class="h-screen w-screen relative overflow-hidden">
  {#if !isStarted}
    <div class="fixed bg-bg/80 size-full flex flex-col gap-32 justify-center items-center z-10 tracking-[-0.35em]" transition:fade>
      <h1 class="bg-fg text-bg px-6 py-4 rounded text-6xl rotate-4">PERSONA 3 PAUSE MENU</h1>
      <button onclick={start} class="text-6xl flex gap-4 cursor-pointer">
        <span>ENTER</span>
        <iconify-icon icon="mdi:arrow-right-bold" class=" text-6xl"></iconify-icon>
      </button>
    </div>
  {/if}

  <!-- background -->
  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={backgroundVideo}
    loop
    src="/background.mp4"
    class="fixed h-full object-cover object-left -z-10"
  ></video>

  <!-- options -->
  <div class="ml-204 flex flex-col items-start justify-center h-full relative -space-y-32">
    {#each options as option, i}
      <Option
        index={i}
        isSelected={selectedIndex === i}
        onSelect={() => setIndex(i)}
        {option}
      />
    {/each}
  </div>

  <!-- controls -->
  <div class="absolute bottom-0 right-0 font-new-rodin flex flex-col items-start">
    <p class="italic text-3xl pr-20 text-shadow-under">
      {options[selectedIndex].description}
    </p>

    <div class="flex items-center w-full">
      <span class="text-shadow-under">Command</span>
      <hr class="border border-fg w-full grow shadow-under">
    </div>

    <!-- controls -->
    <div class="flex gap-4 items-center justify-end w-full pr-20 mt-4 mb-6 text-shadow-under">
      <Control key="B">Confirm</Control>
      <Control key="A">Close</Control>
    </div>
  </div>

  <!-- side text -->
  <div class="text-[28rem] absolute flex gap-8 w-[100vh] h-[28rem] rotate-90 -translate-y-[42rem] origin-bottom-left left-0 top-0 tracking-[-0.16em] text-muted italic">
    <span class="z-1">0{selectedIndex + 1}</span>
    <span class="text-black">MAIN</span>
  </div>
</main>
