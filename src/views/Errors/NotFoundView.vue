<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useRouter } from "vue-router";

export default {
  name: "NotFoundView",
  components: { NavbarComponent },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavbarComponent />
    <div class="flex-1 flex flex-col items-center justify-center px-2">
      <img
        src="@/assets/images/not-found.svg"
        alt="Not Found"
        class="mx-auto max-w-64"
      />
      <p class="text-center text-xl mb-4">
        The page you are looking for does not exist. Check your URL and try
        again.
      </p>
      <button
        type="button"
        @click="router.push('/')"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-auto mx-auto mb-6"
      >
        Go to homepage
      </button>
      <div class="">
        <p>Details</p>
        <p
          class="bg-gray-700 text-white font-mono rounded-lg p-4 mb-4 shadow-inner"
        >
          HTTP 404: Not Found <br />
          route: {{ $route.fullPath }}<br />
          params: {{ $route.params }} <br />
          query: {{ $route.query }}
        </p>
      </div>
    </div>
  </div>
</template>
