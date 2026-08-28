<!-- Shared window-chrome bar (traffic-light dots + pause/play button) for the terminal and agent
     faces of GetStartedTabs — extracted to avoid duplicating the markup between the two faces. -->
<script setup lang="ts">
defineProps<{
  manuallyPaused: boolean;
  playLabel: string;
  pauseLabel: string;
}>();

defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="gs-terminal__chrome">
    <span class="gs-terminal__dot -red" aria-hidden="true" />
    <span class="gs-terminal__dot -yellow" aria-hidden="true" />
    <span class="gs-terminal__dot -green" aria-hidden="true" />
    <button
      type="button"
      class="instui-button -shape-circle -without-background -without-border gs-terminal__pause-btn"
      :class="manuallyPaused ? '-icon-play' : '-icon-pause'"
      :aria-label="manuallyPaused ? playLabel : pauseLabel"
      @click="$emit('toggle')"
    ></button>
  </div>
</template>
