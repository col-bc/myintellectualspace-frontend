<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "HomeView",
  components: { NavbarComponent },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="min-h-screen flex-col">
    <NavbarComponent />

    <div class="flex items-center flex-1 p-4 mx-auto mt-8">
      <!-- Landing -->
      <div class="flex flex-col md:flex-row items-center max-w-screen">
        <div>
          <h1
            class="text-6xl font-black text-slate-900 mb-8 text-center md:text-left"
          >
            Welcome to your Intellectual Space
          </h1>
          <p
            class="max-w-2xl mb-8 leading-relaxed text-slate-800 text-center md:text-left"
          >
            Intellectual Space is a place for learning, networking, and
            innovation. Our mission is to give access and guidance to all
            communities, regardless of fiscal or social capital. We present the
            tools and resources to allow our users to connect with other members
            with a variety of skills, knowledge, trades, and interests, so that
            they may develop a strong network and community, presenting job
            opportunities, networking opportunities, and much more!
          </p>
          <div
            class="flex flex-row items-center gap-x-6 justify-center md:justify-start"
          >
            <button
              @click="$router.push({ name: 'register' })"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center flex items-center gap-x-4"
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
              class="px-6 py-3.5 mr-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200"
            >
              See my profile
            </button>
          </div>
        </div>
        <img
          src="@/assets/images/Intellectual.png"
          class="hidden md:flex w-auto"
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
