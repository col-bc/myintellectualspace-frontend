<script>
import { ref } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useRoute } from "vue-router";

export default {
  name: "HomeView",
  components: { NavbarComponent },
  setup() {
    const route = useRoute();
    const isLogout = route.query.logout;
    const isLogoutShown = ref(!!isLogout);

    return {
      isLogout,
      isLogoutShown,
    };
  },
};
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <NavbarComponent />
    <!-- Sign out notification -->
    <div
      v-show="isLogoutShown"
      class="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 flex items-center"
      role="alert"
    >
      <div class="flex-1">
        <span class="inline-flex flex-1 font-bold">Logged out successfully</span
        >. See you next time!
      </div>
      <button
        type="button"
        @click="isLogoutShown = false"
        class="bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8"
      >
        <svg
          class="w-5 h-5 ml-auto"
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

    <div class="flex flex-row h-full items-stretch">
      <div class="flex flex-col max-w-2xl justify-center h-full p-4">
        <h1
          class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-relaxed"
        >
          Welcome to your Intellectual Space
        </h1>
        <p class="mb-8 leading-relaxed font-medium text-md text-slate-800">
          Intellectual Space is a place for learning, networking, and
          innovation. Our mission is to give access and guidance to all
          communities, regardless of fiscal or social capital. We present the
          tools and resources to allow our users to connect with other members
          with a variety of skills, knowledge, trades, and interests, so that
          they may develop a strong network and community, presenting job
          opportunities, networking opportunities, and much more!
        </p>
        <div class="flex flex-row flex-wrap items-center gap-6 justify-start">
          <button
            @click="$router.push({ name: 'register' })"
            type="button"
            class="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-4 text-center flex items-center shadow-lg shadow-blue-500/40 gap-x-4"
          >
            Start Connecting Today
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <button
            type="button"
            @click="$router.push({ name: 'profile' })"
            class="px-8 py-4 text-lg h-full font-medium text-blue-700 bg-transparent border-2 border-blue-700 rounded-lg hover:bg-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Explore Our Community
          </button>
        </div>
      </div>
      <div class="flex-1 h-full">
        <img
          class="relative h-full w-full object-cover z-0"
          src="https://images.unsplash.com/photo-1569292567777-e5d61a759322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80"
          alt="Intellectual Space"
        />
      </div>
    </div>
  </div>

  <!-- Features -->
  <div
    class="bg-slate-800 text-slate-50 w-full py-12 px-2 sm:px-4 flex flex-col"
  >
    <h1 class="w-full text-center text-4xl font-bold mb-8">
      All the tools you need to learn, improve, share and succeed.
    </h1>

    <div class="flex flex-row flex-wrap justify-around items-center gap-4">
      <div
        class="flex mt-6 mb-8 text-center hover:scale-110 transition transform"
      >
        <div
          class="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900"
        >
          <img src="@/assets/icons/globe.svg" class="w-52 mb-2 flex-1" />
          <span class="font-medium text-lg">Grow your network</span>
        </div>
      </div>
      <div
        class="flex mt-6 mb-8 text-center hover:scale-110 transition transform"
      >
        <div
          class="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900"
        >
          <img src="@/assets/icons/student.svg" class="w-52 mb-2 flex-1" />
          <span class="font-medium text-lg">Learn from experts</span>
        </div>
      </div>
      <div
        class="flex mt-6 mb-8 text-center hover:scale-110 transition transform"
      >
        <div
          class="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900"
        >
          <img src="@/assets/icons/teacher.svg" class="w-52 mb-2 flex-1" />
          <span class="font-medium text-lg">Share your knowledge</span>
        </div>
      </div>
      <div
        class="flex mt-6 mb-8 text-center hover:scale-110 transition transform"
      >
        <div
          class="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900"
        >
          <img src="@/assets/icons/astronaut.svg" class="w-52 mb-2 flex-1" />
          <span class="font-medium text-lg">Find work you'll love</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Jobs -->
  <div class="w-full py-12 px-2 sm:px-4 flex flex-col">
    <h2 class="text-slate-900 font-bold text-3xl mb-8">Recently Posted Jobs</h2>
    <div class="grid grid-flow-row md:grid-flow-col gap-4 justify-between">
      <a
        href="#"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 hover:bg-slate-100"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-slate-900">
          Front-end Developer
        </h5>
        <span
          class="p-2 text-red-800 rounded text-sm ml-auto flex items-center font-medium"
        >
          Urgently Needed
        </span>
        <p class="font-normal text-gray-700">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          error nihil voluptates harum voluptatum illo aliquam voluptas
          repellendus? Esse non laudantium quasi perspiciatis libero officiis
          repellat beatae magnam placeat recusandae!
        </p>
      </a>
      <a
        href="#"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 hover:bg-slate-100"
      >
        <h5 class="text-2xl font-bold tracking-tight text-slate-900 mb-auto">
          Office Manager
        </h5>
        <p class="font-normal text-gray-700">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          error nihil voluptates harum voluptatum illo aliquam voluptas
          repellendus? Esse non laudantium quasi perspiciatis libero officiis
          repellat beatae magnam placeat recusandae!
        </p>
      </a>
      <a
        href="#"
        class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 hover:bg-slate-100"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-slate-900">
          Senior Software Engineer
        </h5>
        <span
          class="p-2 text-red-800 rounded text-sm ml-auto flex items-center font-medium"
        >
          Urgently Needed
        </span>
        <p class="font-normal text-gray-700">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          error nihil voluptates harum voluptatum illo aliquam voluptas
          repellendus? Esse non laudantium quasi perspiciatis libero officiis
          repellat beatae magnam placeat recusandae!
        </p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.floating {
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 30px;
  margin-top: 5px;
}

@keyframes floating {
  from {
    transform: translate(0, 0px);
  }
  65% {
    transform: translate(0, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
}
</style>
