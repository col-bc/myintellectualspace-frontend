<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import InputModalComponent from "@/components/InputModalComponent.vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

import { ref, watch } from "vue";
import axios from "axios";

/*
 * TODO:
 * [ ] Add tab content to be a router-view
 * [ ] Move each tab into its own view
 * [ ] Update the router to implement the tabs
 */

export default {
  name: "ProfileParentView",
  components: {
    NavbarComponent,
    InputModalComponent,
  },

  setup() {
    const tasks = ref([]);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const alertModel = ref({
      show: false,
      message: "",
      type: "", // success, error, warning
    });
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // auto close alert after 7 seconds
    watch(
      () => alertModel.value.show,
      (newVal) => {
        if (newVal) {
          setTimeout(() => {
            alertModel.value.show = false;
            scrollToTop();
          }, 7000);
        }
      }
    );

    const profilePicture = ref(null);
    const updateProfilePic = () => {
      // post multipart form data to update profile picture
      const formData = new FormData();
      formData.append("file", profilePicture.value);
      axios
        .post("http://localhost:5000/api/user/set-avatar", formData, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          },
        })
        .then((res) => {
          store.setUserData(res.data.user);
          alertModel.value = {
            show: true,
            message: "Profile picture updated successfully",
            type: "success",
          };
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const profilePicturePreview = ref(null);
    const onProfilePicInputChange = (e) => {
      profilePicture.value = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePicturePreview.value = e.target.result;
      };
      reader.readAsDataURL(profilePicture.value);
    };

    return {
      store,
      router,
      route,
      tasks,
      alertModel,
      profilePicture,
      updateProfilePic,
      onProfilePicInputChange,
      profilePicturePreview,
      defaultAvatar: require("@/assets/images/profile-picture-default.png"),
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <!-- Alert -->
  <div
    v-show="alertModel.show"
    class="flex p-4 text-sm"
    :class="{
      'text-red-700 bg-red-100': alertModel.type === 'error',
      'text-green-700 bg-green-100': alertModel.type === 'success',
      'text-yellow-700 bg-yellow-100': alertModel.type === 'warning',
    }"
    role="alert"
  >
    <div class="container flex items-center px-2 mx-auto">
      <!-- Check -->
      <svg
        v-if="alertModel.type === 'success'"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-circle-check w-6 h-6 mr-4"
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
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
      <!-- Error -->
      <svg
        v-if="alertModel.type === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-alert-circle w-6 h-6 mr-4"
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
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <!-- Warning -->
      <svg
        v-if="alertModel.type === 'warning'"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-flag-2"
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
        <path d="M5 14h14v-9h-14v16" />
      </svg>
      <p>{{ alertModel.message }}</p>
    </div>
  </div>

  <div
    class="flex flex-col mx-auto md:flex-row my-8 px-4 lg:px-8 lg:space-x-8 md:space-x-4"
  >
    <!-- Left Col -->
    <div class="flex flex-col w-full md:w-1/3">
      <h1
        class="w-full text-gray-900 font-bold text-4xl text-left mb-8 lg:mb-8"
      >
        {{ store.user.first_name }} {{ store.user.last_name }}
      </h1>
      <!-- Profile Picture / Name / Settings Button -->
      <div class="flex flex-col items-center justify-center">
        <img
          class="bg-white rounded-xl aspect-square w-full h-full object-center object-cover shadow lg:shadow-xl border border-gray-200 mb-4"
          :src="store.user.avatar_uri ? store.user.avatar_uri : defaultAvatar"
        />
        <InputModalComponent
          buttonText="Change Profile Picture"
          :options="['Upload Picture', 'Cancel']"
          :title="'Upload Profile Picture'"
          :show="false"
        >
          <form
            @submit.prevent="updateProfilePic()"
            enctype="multipart/form-data"
            id="profile-pic-form"
          >
            <div class="flex justify-center items-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
              >
                <div
                  class="flex flex-col justify-center items-center pt-5 pb-6"
                >
                  <svg
                    v-if="!profilePicturePreview"
                    class="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <img
                    v-else
                    :src="profilePicturePreview"
                    class="max-h-64 object-cover object-center"
                  />
                  <p class="mb-2 text-sm text-gray-5000">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  @change="onProfilePicInputChange($event)"
                  type="file"
                  class="hidden"
                />
              </label>
            </div>
            <button
              type="submit"
              class="bg-transparent text-gray-600 hover:bg-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded p-2 ml-auto"
            >
              Change
            </button>
          </form>
        </InputModalComponent>
      </div>
    </div>
    <!-- Right Col -->
    <div class="flex flex-col md:w-2/3">
      <button
        type="button"
        @click="router.push({ name: 'social-post' })"
        class="text-white w-full md:w-52 my-8 md:mt-0 ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm shadow px-5 py-2.5"
      >
        New Post
      </button>

      <div class="p-4 bg-white rounded-xl border border-gray-200 shadow">
        <!-- Tabs -->
        <div class="border-b-2 border-gray-200 dark:border-gray-700 mb-6">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-800"
          >
            <li class="mr-2">
              <a
                @click="router.push({ name: 'social-details' })"
                class="inline-flex p-4 rounded-full mb-1 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                :class="{
                  'bg-blue-200 hover:bg-blue-200 shadow-sm':
                    route.name === 'social-details',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-id w-5 h-5 mr-2"
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
                  <rect x="3" y="4" width="18" height="16" rx="3" />
                  <circle cx="9" cy="10" r="2" />
                  <line x1="15" y1="8" x2="17" y2="8" />
                  <line x1="15" y1="12" x2="17" y2="12" />
                  <line x1="7" y1="16" x2="17" y2="16" />
                </svg>
                Profile
              </a>
            </li>
            <li class="mr-2">
              <a
                @click="router.push({ name: 'social-feed' })"
                class="inline-flex p-4 rounded-full mb-1 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                :class="{
                  'bg-blue-200 hover:bg-blue-200 shadow-sm':
                    route.name === 'social-feed' ||
                    route.name === 'social-post',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-rss w-5 h-5 mr-2"
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
                  <circle cx="5" cy="19" r="1" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <path d="M4 11a9 9 0 0 1 9 9" />
                </svg>
                Feed
              </a>
            </li>
            <li class="mr-2">
              <a
                @click="router.push({ name: 'social-connections' })"
                class="inline-flex p-4 rounded-full mb-1 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                :class="{
                  'bg-blue-200 hover:bg-blue-200 shadow-sm':
                    route.name === 'social-connections',
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-users w-5 h-5 mr-2"
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
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                Connections
              </a>
            </li>
          </ul>
        </div>
        <!-- Tab Content -->
        <router-view />
      </div>
    </div>
  </div>
</template>
