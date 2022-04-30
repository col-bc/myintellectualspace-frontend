<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavbarComponent",
  setup() {
    const mobileMenuOpen = ref(false);
    const vpWidth = ref(window.innerWidth);
    window.onresize = () => {
      vpWidth.value = window.innerWidth;
    };
    watch(vpWidth, () => {
      mobileMenuOpen.value = false;
    });
    const store = useStore();

    return {
      mobileMenuOpen,
      store,
      route: useRoute().name,
      searchShown: ref(false),
      isLoggedIn: ref(store.isLoggedIn),
    };
  },
});
</script>

<template>
  <nav class="bg-white border-gray-200 border-b px-2 sm:px-4 py-2.5">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12 text-gray-900 hover:scale-110 hover:rotate-6 transform transition"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M184 0C214.9 0 240 25.07 240 56V456C240 486.9 214.9 512 184 512C155.1 512 131.3 490.1 128.3 461.9C123.1 463.3 117.6 464 112 464C76.65 464 48 435.3 48 400C48 392.6 49.27 385.4 51.59 378.8C21.43 367.4 0 338.2 0 304C0 272.1 18.71 244.5 45.77 231.7C37.15 220.8 32 206.1 32 192C32 161.3 53.59 135.7 82.41 129.4C80.84 123.9 80 118 80 112C80 82.06 100.6 56.92 128.3 49.93C131.3 21.86 155.1 0 184 0zM383.7 49.93C411.4 56.92 432 82.06 432 112C432 118 431.2 123.9 429.6 129.4C458.4 135.7 480 161.3 480 192C480 206.1 474.9 220.8 466.2 231.7C493.3 244.5 512 272.1 512 304C512 338.2 490.6 367.4 460.4 378.8C462.7 385.4 464 392.6 464 400C464 435.3 435.3 464 400 464C394.4 464 388.9 463.3 383.7 461.9C380.7 490.1 356.9 512 328 512C297.1 512 272 486.9 272 456V56C272 25.07 297.1 0 328 0C356.9 0 380.7 21.86 383.7 49.93z"
          />
        </svg>
        <span class="text-lg font-bold text-gray-900">Intellectual Space</span>
      </router-link>
      <div class="flex md:order-2 items-center">
        <!-- Login: if not logged in -->
        <button
          v-show="!store.isLoggedIn"
          @click="$router.push({ name: 'login' })"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
        >
          Login
        </button>
        <!-- Search Button -->
        <button
          @click="searchShown = !searchShown"
          v-show="store.isLoggedIn"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!-- Profile button: if logged in -->
        <button
          @click="$router.push({ name: 'profile' })"
          v-show="store.isLoggedIn"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            v-show="!mobileMenuOpen"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            v-show="mobileMenuOpen"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Desktop menu -->
      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-4"
      >
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Social Hub</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >Learners</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Educators</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Job Seekers</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Search -->
  <div
    v-show="searchShown"
    class="absolute left-0 w-screen h-auto rounded-b border-t-0 border-gray-300 bg-white px-2 sm:px-6 pb-2.5 shadow transform transition-transform"
    :class="{
      '-top-full': !searchShown,
      'top-16': searchShown,
    }"
  >
    <form>
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block p-2.5 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          class="text-white absolute right-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1"
        >
          Search
        </button>
      </div>
    </form>
  </div>
  <!-- Mobile Dropdown -->
  <nav
    class="absolute left-0 w-screen h-auto rounded-b border-t-0 border-gray-300 bg-white px-2 sm:px-6 pb-2.5 shadow transform transition-transform"
    :class="{
      '-top-full': !mobileMenuOpen,
      'top-16': mobileMenuOpen,
    }"
  >
    <div class="flex justify-between items-center w-full">
      <ul class="flex flex-col mt-4 text-sm w-full">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'home'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
            Home
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: null }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'social'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
              />
              <path
                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
              />
            </svg>
            Social Hub
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: null }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'student'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white  hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
            Students
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: null }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'student'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white  hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Educators
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: null }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'student'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white  hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
              <path
                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
              />
            </svg>
            Job Seekers
          </router-link>
        </li>
        <li class="mt-4 mb-2" v-show="isLoggedIn">
          <router-link
            :to="{ name: 'logout' }"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5"
          >
            Logout
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
