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
      class="instui-button -shape-circle -without-background -without-border gs-terminal__pause-btn --padding-none"
      :class="manuallyPaused ? '-icon-play' : '-icon-pause'"
      :aria-label="manuallyPaused ? playLabel : pauseLabel"
      @click="$emit('toggle')"
    ></button>
  </div>
</template>

<style scoped>
.gs-terminal__chrome {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: none;
  gap: 6px;
  padding: 6px 6px 6px 12px;
  background: light-dark(#d8dce2, #464d53);
  border-bottom: 1px solid light-dark(#bec5ce, #2f363d);
  border-radius: 8px 8px 0 0;
}

.gs-terminal__dot {
  display: inline-block;
  inline-size: 10px;
  block-size: 10px;
  border-radius: 50%;
  flex: none;
}

.gs-terminal__dot.-red {
  background: #ff5f56;
}

.gs-terminal__dot.-yellow {
  background: #ffbd2e;
}

.gs-terminal__dot.-green {
  background: #27c93f;
}

.gs-terminal__pause-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1.15rem;
  block-size: 1.15rem;
  min-inline-size: 0;
  min-block-size: 0;
  margin-inline-start: auto;
  padding: 0;
  border-radius: 999px;
  color: light-dark(#5b6572, #c4cad2);
  font-size: 0.7rem;
  cursor: pointer;
}

.gs-terminal__pause-btn:hover,
.gs-terminal__pause-btn:focus-visible {
  color: light-dark(#2b323b, #f2f4f7);
}
</style>
