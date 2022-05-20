<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: { FooterComponent },

  setup() {
    return;
  },
};
</script>

<template>
  <div class="min-h-screen">
    <router-view />
  </div>
  <footer-component />
  <div id="modal-root"></div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;

html,
body,
#app {
  height: 100%;
  min-height: 100vh;
  @apply bg-gray-100;
}
</style>
