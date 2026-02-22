<script lang="ts">
  import Option from "$lib/components/Option.svelte";
  import SelectionCursor from "$lib/components/SelectionCursor.svelte";
  import { fade } from "svelte/transition";

  const options = [
    "SKILL",
    "ITEM",
    "EQUIP",
    "PERSONA",
    "STATS",
    "QUEST",
    "SOCIAL LINK",
    "CALENDAR",
    "SYSTEM"
  ];
  const rotations = [-20, -10, -15, -15, 0, -14, -8, -5, 8];
  const zIndices = [1, 0, 1, 2, 0, 1, 0, 1, 0];
  const offsets = [-20, 0, 0, 0, 0, 0, 0, 0, 0];

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
  <div class="ml-260 flex flex-col items-start justify-center h-full relative -space-y-4">
    <SelectionCursor left="{-100}px" top="{selectedIndex * 80 + 190}px" />

    {#each options as option, i}
      <Option
        index={i}
        zIndex={zIndices[i]}
        rotation={rotations[i]}
        isSelected={selectedIndex === i}
        onSelect={() => setIndex(i)}
        offsetX={offsets[i]}
        offsetY={-200}
      >
        {option}
      </Option>
    {/each}
  </div>
</main>
