<script lang="ts">
  import Option from "$lib/components/Option.svelte";
  import SelectionCursor from "$lib/components/SelectionCursor.svelte";
  import { fade } from "svelte/transition";
  import type { OptionValue } from "$lib/types";

  const options: OptionValue[] = [
    { name: "SKILL", rotation: -25, zIndex: 1, offsetX: -60, offsetY: 50 },
    { name: "ITEM", rotation: -10, zIndex: 0, offsetX: 0, offsetY: 40 },
    { name: "EQUIP", rotation: -15, zIndex: 1, offsetX: -60, offsetY: 30 },
    { name: "PERSONA", rotation: -15, zIndex: 2, offsetX: -90, offsetY: 10 },
    { name: "STATS", rotation: 0, zIndex: 0, offsetX: 0, offsetY: 20 },
    { name: "QUEST", rotation: -14, zIndex: 1, offsetX: -60, offsetY: 20 },
    { name: "SOCIAL LINK", rotation: -8, zIndex: 2, offsetX: 0, offsetY: 0 },
    { name: "CALENDAR", rotation: -5, zIndex: 1, offsetX: -80, offsetY: 0 },
    { name: "SYSTEM", rotation: 8, zIndex: 0, offsetX: 20, offsetY: 0 }
  ]

  let backgroundVideo: HTMLVideoElement;
  let isStarted = $state(false);
  let selectedIndex = $state(0);

  function setIndex(index: number) {
    selectedIndex = index;
  }

  function start() {
    isStarted = true;
    backgroundVideo.play();
  }
</script>

<main class="h-screen w-screen relative">
  {#if !isStarted}
    <div class="fixed bg-bg/80 size-full flex flex-col gap-32 justify-center items-center z-10" transition:fade>
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
  <div class="ml-260 flex flex-col items-start justify-center h-full relative -space-y-2">
    <SelectionCursor
      left={-50}
      top={selectedIndex * 86 + 200}
      currentOption={options[selectedIndex]}
    />

    {#each options as option, i}
      <Option
        index={i}
        isSelected={selectedIndex === i}
        onSelect={() => setIndex(i)}
        {option}
      >
        {option.name}
      </Option>
    {/each}
  </div>
</main>
