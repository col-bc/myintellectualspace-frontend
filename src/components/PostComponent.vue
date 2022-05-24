<script>
import { defineComponent, ref } from "vue";
import ChoiceModalComponent from "./ChoiceModalComponent.vue";
import { useStore } from "@/store";
import axios from "axios";

export default defineComponent({
  name: "PostComponent",
  components: { ChoiceModalComponent },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const actionMenuOpen = ref(false);
    const isPostOwner = () => {
      return store.getUserData.id === props.post.owner_id;
    };

    function timeSince(dateStr) {
      var date = new Date(dateStr);
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years ag0";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ag0";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes agp";
      }
      return Math.floor(seconds) + " seconds ago";
    }

    async function deletePost() {
      const postId = props.post.id;
      await axios
        .delete(`http://localhost:5000/api/user/post/${props.post.id}`, {
          headers: { Authorization: store.bearerToken },
        })
        .then(() => {
          // remove post from store
          store.user.post_ids.splice(store.user.post_ids.indexOf(postId), 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      actionMenuOpen,
      mPost: props.post,
      isPostOwner,
      deletePost,
      timeSince,
      defaultAvatar: require("@/assets/images/profile-picture-default.png"),
    };
  },
});
</script>

<template>
  <div
    class="bg-white shadow flex flex-col rounded-lg border border-gray-200 p-2"
  >
    <div class="flex items-center gap-4 mb-2">
      <img
        :src="mPost.owner_avatar || defaultAvatar"
        class="border rounded-lg object-center object-cover w-20 h-20"
      />
      <div class="flex flex-col h-20 pt-2">
        <p class="flex-1 leading-relaxed font-normal text-base">
          {{ mPost.content }}
        </p>
        <p class="text-sm text-gray-600">
          By
          <router-link
            class="text-blue-500 hover:text-blue-700 hover:underline"
            :to="{
              name: 'social-handle',
              params: { handle: mPost.owner_handle },
            }"
          >
            {{ mPost.owner_name.split(" ")[0] }}
          </router-link>
          {{ timeSince(mPost.created_at) }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-end bg-gray-100 rounded gap-2 p-2">
      <p class="text-gray-800 text-sm mr-auto inline-flex items-center gap-x-2">
        <svg
          v-show="!!mPost.location"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-map-pin w-6 h-6"
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
          <circle cx="12" cy="11" r="3" />
          <path
            d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
          />
        </svg>
        {{ mPost.location }}
      </p>
      <!-- Like -->
      <button
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-thumb-up w-6 h-6"
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
            d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
          />
        </svg>
      </button>
      <!-- Comment -->
      <button
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-message-dots w-6 h-6"
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
            d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"
          />
          <line x1="12" y1="11" x2="12" y2="11.01" />
          <line x1="8" y1="11" x2="8" y2="11.01" />
          <line x1="16" y1="11" x2="16" y2="11.01" />
        </svg>
      </button>
      <!-- Share Post -->
      <button
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-share w-6 h-6"
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
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
          <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
        </svg>
      </button>
      <!-- Action Menu -->
      <div class="relative">
        <button
          @click="actionMenuOpen = !actionMenuOpen"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-dots-vertical w-6 h-6"
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="12" cy="5" r="1" />
          </svg>
        </button>
        <div
          v-show="actionMenuOpen"
          class="z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 absolute right-0 mt-2"
        >
          <ul class="py-1 text-sm text-gray-700">
            <li v-if="isPostOwner()">
              <ChoiceModalComponent
                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                :title="'Are you sure you want to delete this post? This cannot be undone.'"
                :choices="['Yes, delete it', 'Cancel']"
                type="error"
                @on-close="
                  (idx) => {
                    if (idx === 0) deletePost();
                    actionMenuOpen = false;
                  }
                "
              >
                <div class="inline-flex items-center gap-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-trash w-5 h-5 text-gray-700"
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
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                  <span>Delete</span>
                </div>
              </ChoiceModalComponent>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                <div class="inline-flex items-center gap-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-flag-2 w-5 h-5"
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
                  <span>Report</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
''
