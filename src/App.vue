<template>
  <router-view />

  <footer class="p-4 bg-transparent rounded-lg shadow md:px-6 md:py-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12 text-slate-900 hover:scale-110 hover:rotate-6 transform transition"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M184 0C214.9 0 240 25.07 240 56V456C240 486.9 214.9 512 184 512C155.1 512 131.3 490.1 128.3 461.9C123.1 463.3 117.6 464 112 464C76.65 464 48 435.3 48 400C48 392.6 49.27 385.4 51.59 378.8C21.43 367.4 0 338.2 0 304C0 272.1 18.71 244.5 45.77 231.7C37.15 220.8 32 206.1 32 192C32 161.3 53.59 135.7 82.41 129.4C80.84 123.9 80 118 80 112C80 82.06 100.6 56.92 128.3 49.93C131.3 21.86 155.1 0 184 0zM383.7 49.93C411.4 56.92 432 82.06 432 112C432 118 431.2 123.9 429.6 129.4C458.4 135.7 480 161.3 480 192C480 206.1 474.9 220.8 466.2 231.7C493.3 244.5 512 272.1 512 304C512 338.2 490.6 367.4 460.4 378.8C462.7 385.4 464 392.6 464 400C464 435.3 435.3 464 400 464C394.4 464 388.9 463.3 383.7 461.9C380.7 490.1 356.9 512 328 512C297.1 512 272 486.9 272 456V56C272 25.07 297.1 0 328 0C356.9 0 380.7 21.86 383.7 49.93z"
          />
        </svg>
        <span class="text-lg font-bold text-slate-900">Intellectual Space</span>
      </router-link>
      <ul
        class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0"
      >
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
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center"
      >© 2022 <a href="#" class="hover:underline">Intellectual Space</a>. All
      Rights Reserved.
    </span>
  </footer>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;

body,
html,
#app {
  @apply bg-slate-50;
}
</style>
