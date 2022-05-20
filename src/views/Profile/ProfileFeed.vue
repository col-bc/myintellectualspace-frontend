<script>
import { defineComponent, reactive, onMounted } from "vue";
import PostComponent from "@/components/PostComponent.vue";
import { useStore } from "@/store";

import axios from "axios";

export default defineComponent({
  name: "ProfileFeed",
  components: { PostComponent, },

  setup() {
    const store = useStore();
    const user = reactive(store.getUserData);
    const userPosts = reactive([]);
    const networkPosts = reactive([]);

    onMounted(() => {
      axios
        .get("http://localhost:5000/api/user/post/user/" + user.id, {
          headers: {
            Authorization: "Bearer " + store.getToken,
          },
        })
        .then((res) => {
          console.log(res.data.posts);
          for (res of res.data.posts) userPosts.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      user,
      userPosts,
      networkPosts,
    };
  },
});
</script>

<template>
  <!-- Empty State -->
  <div v-if="userPosts.length <= 0">
    <div class="flex flex-col items-center justify-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-packagew my-6 mx-auto text-gray-300"
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
        <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
        <line x1="12" y1="12" x2="20" y2="7.5" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="12" y1="12" x2="4" y2="7.5" />
        <line x1="16" y1="5.25" x2="8" y2="9.75" />
      </svg>
      <p class="text-center text-gray-600 text-xl mb-6">
        You haven't posted anything yet.
      </p>
      <button
        @click="$router.push({ name: 'social-post' })"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Post Something
      </button>
    </div>
  </div>
  <div v-else v-for="post of userPosts" :key="post.id">
    <PostComponent :post="post" />
  </div>
</template>
