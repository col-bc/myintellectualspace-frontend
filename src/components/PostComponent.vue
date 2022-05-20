<script>
import { defineComponent } from "vue";
import ChoiceModalComponent from "./ChoiceModalComponent.vue";
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
    const timeSince = (dateStr) => {
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
    };

    const deletePost = (idx, postId) => {
      axios
        .delete(`http://localhost:5000//api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          // props.posts.splice(idx, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updatePost = () => {};

    return {
      mPost: props.post,
      updatePost,
      deletePost,
      timeSince,
    };
  },
});
</script>

<template>
  <div class="flex flex-col rounded-lg border border-gray-300 p-2 mb-6">
    <div class="flex items-center gap-4 mb-2">
      <img
        :src="mPost.owner_avatar"
        class="border rounded-lg object-center object-cover w-20 h-20"
      />
      <div class="flex flex-col">
        <span class="text-sm text-gray-600">{{
          timeSince(mPost.created_at)
        }}</span>
        <p class="leading-relaxed font-medium text-base">{{ mPost.content }}</p>
      </div>
    </div>
    <div class="flex items-center justify-end bg-gray-100 rounded gap-2 p-2">
      <p class="text-gray-800 text-sm">
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
          stroke-width="1.5"
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
          stroke-width="1.5"
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
      <!-- Edit Post -->
      <button
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-edit w-6 h-6"
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
            d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
          />
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
          <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      </button>
      <!-- Delete Post -->
      <!-- <button type="button">
        
      </button> -->
      <ChoiceModalComponent
        class="inline-flex items-center p-2 text-sm text-gray-900 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
        :title="'Are you sure you want to delete this post?'"
        :choices="['Yes, delete it', 'Cancel']"
        type="error"
        @on-close="
          (idx) => {
            modalClose(idx);
          }
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-trash w-6 h-6"
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
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </ChoiceModalComponent>
    </div>
  </div>
</template>
''
