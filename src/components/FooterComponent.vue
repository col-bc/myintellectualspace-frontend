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
      <a
        href="https://github.com/col-bc/myintellectualspace-frontend"
        target="_blank"
        class="w-lg text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        <svg
          class="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
        Contribute on Github
      </a>
      <div
        class="flex flex-col lg:flex-row lg:items-center text-sm text-gray-100 sm:gap-y-2 gap-x-6"
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
