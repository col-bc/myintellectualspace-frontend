<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import ModalComponent from "../../components/ModalComponent.vue";
import { useStore } from "@/store";

import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ProfileHomeView",
  components: { NavbarComponent, ModalComponent },

  setup() {
    const tasks = ref([]);
    const store = useStore();
    const user = ref(store);

    onMounted(() => {
      // Get user data
      if (store.isDataOutdated) {
        (async () => {
          axios
            .get("http://localhost:5000/api/user/", {
              headers: {
                Authorization: "Bearer " + store.token,
              },
            })
            .then((response) => {
              console.log(response);
              store.$patch((state) => {
                state.userId = response.data.id;
                state.firstName = response.data.first_name;
                state.lastName = response.data.last_name;
                state.occupation = response.data.occupation;
                state.email = response.data.email;
                state.token = response.data.auth_token;
                state.bio = response.data.bio;
                state.website = response.data.website;
                state.interests = response.data.interests;
                state.privacy = response.data.privacy_setting;
                state.educationLevel = response.data.education_level;
                state.organizationName = response.data.organization_name;
                state.yearsInBusiness = response.data.years_in_business;
                state.accountType = response.data.account_type;
                state.updatedAt = response.data.updated_at;
                state.tasks = response.data.tasks;
                state.latestFetch = Date.now();
              });
              console.log(user);
              return true;
            })
            .catch((error) => {
              console.log(error);
              return false;
            });
        })();
      }
      if (store.getPostIds <= 0) {
        tasks.value.push({
          task: "Make your first post",
          isComplete: false,
        });
      }
      if (store.getCommentIds <= 0) {
        tasks.value.push({
          task: "Comment on a post",
          isComplete: false,
        });
      }
      console.log(store.getInterests);
      if (!store.getInterests || store.getInterests === "[]") {
        tasks.value.push({
          task: "Add your interests",
          isComplete: false,
        });
      }
    });

    const interestsModalClosed = (option) => {
      console.log(option);
    };

    return {
      store,
      tasks,
      interestsModalClosed,
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <div class="flex flex-col md:flex-row md:flex-wrap px-2 md:px-4">
    <!-- Name / Picture / Bio -->
    <div
      class="mt-8 flex flex-row gap-x-4 md:flex-1 bg-white shadow-sm p-2 rounded-lg rounded-b-none border border-b-0 border-gray-300"
    >
      <img
        class="inline-flex w-36 h-36 rounded-lg shadow border border-white"
        src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="profile picture"
      />
      <div class="flex flex-col flex-1">
        <h1 class="flex-1 text-lg font-bold text-gray-900 mb-auto">
          {{ store.getFirstName }} {{ store.getLastName }}
        </h1>
        <textarea
          class="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-lg h-full p-2.5"
          placeholder="Bio"
          disabled
        />
      </div>
    </div>
    <!-- Details -->
    <div class="flex flex-col p-4 bg-white border-x border-gray-300 gap-y-4">
      <div class="inline-flex flex-1 items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          class="border border-gray-300 bg-white text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block h-full p-2.5 flex-1"
          placeholder="Occupation"
          v-model="store.occupation"
        />
      </div>
      <div class="inline-flex flex-1 items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
          />
        </svg>
        <input
          type="text"
          class="border border-gray-300 bg-white text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block h-full p-2.5 flex-1"
          placeholder="Education"
          v-model="store.occupation"
        />
      </div>
      <div class="inline-flex flex-1 items-center gap-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          class="border border-gray-300 bg-white text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block h-full p-2.5 flex-1"
          placeholder="Website"
          v-model="store.website"
        />
      </div>
      <div class="inline-flex flex-1">
        <router-link
          :to="{ name: null }"
          class="w-full text-center text-blue-700 hover:underline inline-flex items-center justify-center gap-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
          Edit Profile
        </router-link>
      </div>
    </div>
    <!-- Stats -->
    <div
      class="pt-6 bg-white border border-t-0 border-gray-300 flex items-center justify-between w-full rounded-b-lg mb-4 shadpw-sm"
    >
      <div
        class="inline-flex flex-col items-center flex-1 border-r border-slate-300"
      >
        <p
          class="w-12 h-12 text-lg text-center font-black text-blue-800 bg-blue-300 p-2 rounded-full"
        >
          0
        </p>
        <p class="text-sm text-gray-600 font-bold mb-4">CONNECTIONS</p>
      </div>
      <div
        class="inline-flex flex-col items-center flex-1 border-r border-slate-300"
      >
        <p
          class="w-12 h-12 text-lg text-center font-black text-blue-800 bg-blue-300 p-2 rounded-full"
        >
          0
        </p>
        <p class="text-sm text-gray-600 font-bold mb-4">POSTS</p>
      </div>
      <div class="inline-flex flex-col items-center flex-1">
        <p
          class="w-12 h-12 text-lg text-center font-black text-blue-800 bg-blue-300 p-2 rounded-full"
        >
          0
        </p>
        <p class="text-sm text-gray-600 font-bold mb-4">BADGES</p>
      </div>
    </div>

    <!-- Outstanding tasks -->
    <div
      class="p-4 border bg-blue-100 border-blue-400 rounded-lg shadow-sm mb-4"
    >
      <h1
        class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-x-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-blue-800 p-1 bg-blue-300 rounded-full"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          />
        </svg>
        Your next steps
      </h1>

      <div v-for="task in tasks" :key="task" class="flex items-center mb-4">
        <button
          type="button"
          v-show="!task['isComplete']"
          class="text-white text-sm bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-2.5 py-1.5"
        >
          START
        </button>
        <p class="ml-4 text-lg">{{ task["task"] }}</p>
      </div>
    </div>

    <!-- New Post -->
    <form>
      <div
        class="w-full h-full mb-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col shadow-sm"
      >
        <div class="px-4 py-2 bg-white rounded-t-lg flex-1">
          <label for="comment" class="sr-only">New Post</label>
          <textarea
            id="comment"
            rows="5"
            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0"
            placeholder="What's on your mind..."
            required=""
          ></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t">
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 gap-x-4"
          >
            Submit Post
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <ModalComponent
    :show="false"
    :title="'Hello World!'"
    :options="['OK', 'Cancel']"
    @on-close="interestsModalClosed(idx)"
  >
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, voluptatibus,
      facere minus tenetur facilis deserunt autem suscipit, earum quasi
      similique repellat rerum fugit eveniet. Provident voluptatibus unde
      dolorem architecto cum.
    </p>
  </ModalComponent>
</template>
