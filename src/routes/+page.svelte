<script lang="ts">
  import Option from "$lib/components/Option.svelte";
  import { fade } from "svelte/transition";
  import type { OptionValue } from "$lib/types";
  import { onMount } from "svelte";
  import { Howl } from "howler";
  import { animate } from "animejs";

  import Control from "$lib/components/Control.svelte";
  import SettingsOption from "$lib/components/SettingsOption.svelte";
    import { isMobileUserAgentData } from "$lib/utils";

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
  ];

  const musicTracks = [
    "Changing Seasons -Reload-.mp3",
    "Color Your Night.mp3",
    "Full Moon Full Life.mp3",
    "It's Going Down Now.mp3",
    "Mass Destruction -Reload-.mp3",
    "When The Moon's Reaching Out Stars -Reload-.mp3",
    "キミの記憶 -Reload-.mp3",
    "全ての人の魂の戦い.mp3",
    "巌戸台分寮 -Reload-.mp3"
  ];

  let backgroundVideo: HTMLVideoElement;
  let isStarted = $state(false);
  let isMusicEnabled = $state(true);
  let isSFXEnabled = $state(true);
  let selectedIndex = $state(0);
  let currentOptionElement = $state<HTMLButtonElement>();
  let settingsOptionElement = $state<HTMLDivElement>();
  let currentSettingIndex = $state(0);

  const navigationSound = new Howl({
    src: ["/sfx/navigation.wav"],
    volume: 0.5,
  });

  function setIndex(index: number) {
    if (index === selectedIndex) return;
    selectedIndex = index;
    currentOptionElement = document.getElementById(`option-${index}`) as HTMLButtonElement;
    playSound();
  }

  function setSettingsIndex(index: number) {
    if (index === currentSettingIndex) return;
    currentSettingIndex = index;
    // playSound();
    animate(settingsOptionElement!, {
      translateY: index * 56,
      duration: 100,
      easing: "easeOutQuad"
    });
  }

  function start() {
    isStarted = true;
    backgroundVideo.play();

    if (isMusicEnabled) {
      const randomIndex = Math.floor(Math.random() * musicTracks.length);
      new Howl({
        src: `/music/${musicTracks[randomIndex]}`,
        loop: true,
        autoplay: true,
        volume: 0.5,
      });
    }
  }

  function playSound() {
    if (isSFXEnabled) {
      navigationSound.play();
    }
  }

  onMount(() => {
    setIndex(0);

    document.addEventListener("keydown", (e) => {
      if (!isStarted) return;

      if (e.key === "ArrowDown" || e.key === "s") {
        setIndex((selectedIndex + 1) % options.length);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setIndex((selectedIndex - 1 + options.length) % options.length);
      }
    });
  });
</script>

<main class="h-screen w-screen relative overflow-hidden">
  <div class="size-full bg-bg fixed 2xl:hidden flex flex-col justify-center items-center z-100 font-skip font-bold text-2xl px-8">
    <p>Sorry, this website is not supported for for your device.</p>
    <p>Try viewing this site on a computer!</p>
  </div>

  {#if !isStarted}
    <div class="fixed bg-bg/90 size-full flex flex-col gap-32 justify-center items-center z-10" transition:fade>
      <div class="rotate-3 space-y-2">
        <h1 class="bg-fg text-bg px-6 py-4 rounded-md text-6xl tracking-[-0.08em]">
          PERSONA 3 RELOAD<br>
          PAUSE MENU
        </h1>
        <h2 class="flex items-center w-full gap-2 italic text-xl font-new-rodin text-shadow-under">
          <span>
            Recreated with Svelte
          </span>
          <hr class="border border-fg grow shadow-under">
          <a href="https://deltea.space">
            By deltea
          </a>
        </h2>
      </div>

      <div class="flex flex-col gap-2 relative">
        <SettingsOption onSelect={() => setSettingsIndex(0)} isSelected={currentSettingIndex === 0} bind:value={isMusicEnabled}>
          Toggle Music
        </SettingsOption>
        <SettingsOption onSelect={() => setSettingsIndex(1)} isSelected={currentSettingIndex === 1} bind:value={isSFXEnabled}>
          Toggle SFX
        </SettingsOption>

        <div
          bind:this={settingsOptionElement}
          class="w-[32rem] h-12 bg-red -z-1 absolute -top-2 -right-1 rounded-md"
        ></div>
      </div>

      <button onclick={start} class="text-6xl flex gap-4 cursor-pointer">
        <span class="tracking-[-0.05em]">ENTER</span>
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
  <div class="left-[55rem] flex flex-col items-start justify-center h-full relative -space-y-32">
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

    <div class="flex items-center w-full gap-1">
      <span class="text-shadow-under">Command</span>
      <hr class="border border-fg grow shadow-under">
    </div>

    <!-- controls -->
    <div class="flex gap-4 items-center justify-end w-full pr-20 mt-4 mb-6 text-shadow-under">
      <Control key="B">Confirm</Control>
      <Control key="A">Close</Control>
    </div>
  </div>

  <!-- side text -->
  <div class="text-[28rem] absolute flex gap-8 w-[100vh] h-[28rem] rotate-90 -translate-y-[42rem] origin-bottom-left left-0 top-0 tracking-[-0.16em] text-muted italic">
    <!-- <span class="z-1">0{selectedIndex + 1}</span> -->
    <!-- <span class="text-black">MAIN</span> -->
  </div>
</main>
