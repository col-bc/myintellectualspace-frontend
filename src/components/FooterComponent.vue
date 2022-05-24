<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",

  setup() {
    return;
  },
});
</script>

<template>
  <footer class="p-4 bg-slate-900 text-slate-50 md:px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-4">
      <div class="flex items-center">
        <!-- Logo -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-affiliate w-8 h-8 mr-4"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275" />
          <path d="M11.683 12.317l5.759 -5.759" />
          <circle cx="5.5" cy="5.5" r="1.5" />
          <circle cx="18.5" cy="5.5" r="1.5" />
          <circle cx="18.5" cy="18.5" r="1.5" />
          <circle cx="8.5" cy="15.5" r="4.5" />
        </svg>
        <span class="itext-sm font-bold text-white ml-2"
          >Intellectual Space</span
        >
      </div>
      <div
        class="flex flex-col lg:flex-row lg:items-center text-sm text-gray-100 gap-2 md:gap-6"
      >
        <a href="#" class="block h-full hover:underline">Getting Started</a>
        <a href="#" class="block h-full hover:underline">Privacy and Terms</a>
        <a href="#" class="block h-full hover:underline">Support</a>
        <a href="#" class="block h-full hover:underline">Contribute</a>
        <a href="#" class="block h-full hover:underline">Get Help</a>
      </div>
      <span class="text-gray-500 text-sm">
        © {{ new Date().getYear() + 1900 }}
        <a href="#" class="hover:underline">Intellectual Space</a>. All Rights
        Reserved.
      </span>
    </div>
  </footer>
</template>
