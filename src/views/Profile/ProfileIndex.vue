<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import ProfileDetailsView from "@/components/UserDetailsComponent.vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

import { onMounted, ref, watch } from "vue";
import axios from "axios";
import NewPostComponent from "@/components/NewPostComponent.vue";
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "ProfileIndex",
  components: {
    NavbarComponent,
    ProfileDetailsView,
    NewPostComponent,
    PostComponent,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const isLoading = ref(true);
    const user = ref({});
    const posts = ref({});
    const currentTab = ref("feed");
    const alertModel = ref({
      show: false,
      message: "",
      type: "", // success, error, warning
    });

    onMounted(() => {
      const { handle } = route.params;
      // Fetch user's data
      axios
        .get(`http://localhost:5000/api/user/handle/${handle}`, {
          headers: { Authorization: store.bearerToken },
        })
        .then((res) => {
          user.value = res.data;
          let id = res.data.id;

          // fetch user's posts
          axios
            .get(`http://localhost:5000/api/user/post/by-user/${id}`, {
              headers: { Authorization: store.bearerToken },
            })
            .then((res) => {
              posts.value = res.data.posts;
              isLoading.value = false;
            });
        })
        .catch((ex) => {
          console.log(ex);
        });
    });
    watch(
      // auto close alert after 7 seconds
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

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // function alertCallback(alert) {
    //   alertModel.value = alert;
    //   alert.show = true;
    // }

    return {
      alertModel,
      user,
      posts,
      currentTab,
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
    class="flex flex-col mx-auto md:flex-row my-8 px-4 lg:px-8 lg:space-x-12 md:space-x-4"
  >
    <!-- Left Col -->
    <div class="flex flex-col w-full md:w-1/3">
      <h2 class="text-4xl font-bold text-center md:text-left mb-9">
        {{ user.first_name }} {{ user.last_name }}
      </h2>

      <img
        class="bg-white rounded-xl aspect-square w-full object-center object-cover shadow border border-gray-200 mb-10"
        :src="!!user.avatar_uri ? user.avatar_uri : defaultAvatar"
      />
      <button
        type="button"
        class="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-8 py-2 text-center flex items-center shadow-lg shadow-blue-500/40 hover:shadow-blue-700/60 gap-x-4 mb-10 w-full transition duration-200 ease-in-out"
      >
        Send Friend Request
        <img src="@/assets/icons/hand-waving.svg" class="w-8 h-8" />
      </button>
      <ProfileDetailsView class="flex-none" />
    </div>

    <!-- Right Col -->
    <div class="flex flex-col md:w-2/3">
      <div>
        <!-- Tabs -->
        <div
          class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-6"
        >
          <ul class="flex flex-wrap -mb-px">
            <li class="mr-2">
              <button
                @click="currentTab = 'feed'"
                :class="[
                  currentTab === 'feed'
                    ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                    : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
                ]"
              >
                Feed
              </button>
            </li>
            <li class="mr-2">
              <button
                @click="currentTab = 'connections'"
                :class="[
                  currentTab === 'connections'
                    ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                    : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
                ]"
              >
                Connections
              </button>
            </li>
          </ul>
        </div>

        <!-- Tab Content -->
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <svg
            role="status"
            class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h5 class="text-gray-500 font-base text-lg mt-12">Loading...</h5>
        </div>
        <!-- Feed Tab -->
        <div v-if="currentTab === 'feed' && !isLoading">
          <NewPostComponent class="mb-12" />
          <div v-for="p of posts" :key="p">
            <PostComponent :post="p" class="mb-12" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
