<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useStore } from "@/store";

import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
// import axios from "axios";

export default {
  name: "ProfileHomeView",
  components: { NavbarComponent, ModalComponent },

  setup() {
    const tasks = ref([]);
    const store = useStore();

    const activeTab = ref(0);

    return {
      store,
      tasks,
      activeTab,
      showModal: ref(false),
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <div id="teleport-destination"></div>
  <div class="container flex flex-col lg:flex-row my-8 px-4 md:space-x-8">
    <div class="flex flex-col w-full md:w-1/3">
      <!-- Profile Picture -->
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-gray-900 font-bold text-4xl mb-4">
          {{ store.user.first_name }} {{ store.user.last_name }}
        </h1>
        <img
          class="rounded-xl aspect-square w-full h-full object-cover shadow lg:shadow-xl border-2 border-gray-300"
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
      </div>
    </div>
    <div class="flex flex-col md:w-2/3 mt-8 lg:mt-0">
      <!-- Tabs -->
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <button
              @click="activeTab = 0"
              :class="[
                activeTab === 0
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              About you
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="activeTab = 1"
              :class="[
                activeTab === 1
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              Posts
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="activeTab = 2"
              :class="[
                activeTab === 2
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              Friends
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="activeTab = 3"
              :class="[
                activeTab === 3
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      <div
        v-show="activeTab === 0"
        class="p-4 grid grid-flow-row lg:grid-cols-2 gap-6"
      >
        <!-- Bio -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Bio</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span v-show="!store.user.bio || store.user.bio.length === 0">
              You haven't added a bio yet.
            </span>
            {{ store.user.bio }}
          </p>
        </div>
        <!-- Name -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Name</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="
                !store.user.first_name || store.user.first_name.length === 0
              "
            >
              You haven't added a first name yet.
            </span>
            {{ store.user.first_name }}
            <span
              v-show="
                !store.user.last_name || store.user.last_name.length === 0
              "
            >
              You haven't added a last name yet.
            </span>
            {{ store.user.last_name }}
          </p>
        </div>
        <!-- Occupation -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Occupation</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="
                !store.user.occupation || store.user.occupation.length === 0
              "
            >
              You haven't added your occupation yet.
            </span>
            {{ store.user.occupation }}
          </p>
        </div>
        <!-- Location -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Location</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="!store.user.location || store.user.location.length === 0"
            >
              You haven't added your location yet.
            </span>
            {{ store.user.location }}
          </p>
        </div>
        <!-- Website -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Website</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="!store.user.website || store.user.website.length === 0"
            >
              You haven't added your website yet.
            </span>
            {{ store.user.website }}
          </p>
        </div>
        <!-- Education -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Education</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="
                !store.user.education_level ||
                store.user.education_level.length === 0
              "
            >
              You haven't added your education yet.
            </span>
            {{ store.user.education_level }}
          </p>
        </div>
        <!-- Interests -->
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h3 class="text-gray-800 font-medium text-xl mr-12">Interests</h3>
            <a href="#" class="text-blue-700 hover:underline">Edit</a>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span
              v-show="
                !store.user.interests || store.user.interests.length === 0
              "
            >
              You haven't added any interests yet.
            </span>
            {{ store.user.interests }}
          </p>
        </div>
      </div>
    </div>
  </div>
  {{ showModal }}
  <button
    type="button"
    @click="showModal = true"
    class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    Alternative
  </button>

  <!-- Modals -->
  <modal-component
    :show="showModal"
    title="Welcome to the jungle"
    :options="['OK', 'Cancel']"
  >
    TEST
  </modal-component>
</template>
