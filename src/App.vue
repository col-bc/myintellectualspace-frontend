<template>
  <div class="min-h-screen">
    <router-view />
  </div>
  <footer class="mt-12 p-4 bg-slate-900 text-slate-50 md:px-6">
    <div class="flex flex-wrap items-center sm:justify-between space-y-4">
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
        <span class="itext-sm font-bold text-slate-900 ml-2"
          >Intellectual Space</span
        >
      </div>
      <ul class="flex flex-wrap items-center text-sm text-gray-100 sm:mb-0">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
      <span class="text-gray-500 text-sm">
        © {{ new Date().getYear() + 1900 }}
        <a href="#" class="hover:underline">Intellectual Space</a>. All Rights
        Reserved.
      </span>
    </div>
  </footer>
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
  @apply bg-gray-50;
}
</style>
