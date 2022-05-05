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
  <nav class="bg-white shadow border-gray-200 border-b py-2.5">
    <div class="flex flex-wrap justify-between items-center mx-auto md:px-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-affiliate"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="2"
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
        <span class="text-lg font-bold text-gray-900">Intellectual Space</span>
      </router-link>
      <div class="flex items-center md:order-2">
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
          class="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
        <!-- Explore button: if logged in -->
        <button
          @click="$router.push({ name: 'profile' })"
          v-show="store.isLoggedIn"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-safari w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="8 16 10 10 16 8 14 14 8 16" />
            <circle cx="12" cy="12" r="9" />
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
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2 w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <svg
            v-show="mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <!-- Desktop logout button -->
        <button
          type="button"
          @click="$router.push({ name: 'logout' })"
          v-show="store.isLoggedIn"
          class="hidden md:inline-flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-logout w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
            />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </button>
      </div>
      <!-- Desktop menu -->
      <div
        class="hidden justify-between items-center w-full lg:flex lg:w-auto md:order-1"
      >
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              :to="{ name: 'home' }"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'home',
              }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'meetings' }"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'home',
              }"
              >Meetings</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'profile' }"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'profile',
              }"
            >
              Social Hub</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'learners',
              }"
              >Learners</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'educators',
              }"
            >
              Educators</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-700 hover:text-gray-900"
              :class="{
                'border-b-2 border-blue-700': $route.name === 'jobs',
              }"
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
              class="icon icon-tabler icon-tabler-home-2 w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <rect x="10" y="12" width="4" height="4" />
            </svg>
            Home
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'meetings' }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'meetings'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-video w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"
              />
              <rect x="3" y="6" width="12" height="12" rx="2" />
            </svg>
            Meetings
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
              class="icon icon-tabler icon-tabler-social w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <circle cx="12" cy="14" r="3" />
              <line x1="12" y1="7" x2="12" y2="11" />
              <line x1="6.7" y1="17.8" x2="9.5" y2="15.8" />
              <line x1="17.3" y1="17.8" x2="14.5" y2="15.8" />
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
              class="icon icon-tabler icon-tabler-notebook w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"
              />
              <line x1="13" y1="8" x2="15" y2="8" />
              <line x1="13" y1="12" x2="15" y2="12" />
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
              class="icon icon-tabler icon-tabler-school w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
              <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
            </svg>
            Educators
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: null }"
            class="py-2 pr-4 pl-3 rounded flex items-center gap-x-4"
            :class="[
              route.name === 'jobs'
                ? 'bg-blue-700 text-white'
                : 'text-gray-900 bg-white  hover:bg-gray-100',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-briefcase w-5 h-5"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
              <line x1="12" y1="12" x2="12" y2="12.01" />
              <path d="M3 13a20 20 0 0 0 18 0" />
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
