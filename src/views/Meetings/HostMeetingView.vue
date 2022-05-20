<script>
import { useRoute } from "vue-router";
import MeetingComponent from "@/components/MeetingComponent.vue";

export default {
  components: {
    MeetingComponent,
  },
  setup() {
    const route = useRoute();
    const { meetingId, meetingJWT, meetingTitle } = route.params;

    const copyContent = (content, event) => {
      navigator.clipboard.writeText(content);
      let icon = event.target.querySelector("svg");
      icon.classList.remove("hidden");
      setTimeout(() => {
        icon.classList.add("hidden");
      }, 1750);
    };

    return {
      meetingId,
      meetingJWT,
      meetingTitle,
      copyContent,
    };
  },
};
</script>

<template>
  <div class="min-h-screen">
    <div
      class="px-4 py-1.5 text-black bg-gray-100 flex items-center justify-between"
    >
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        End Meeting
      </button>
      <p>
        Meeting ID:
        <span
          class="font-bold hover:underline cursor-pointer inline-flex items-center"
          @click="copyContent(meetingId, $event)"
        >
          {{ meetingId }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="hidden ml-2 icon icon-tabler icon-tabler-check w-6 h-6 text-green-700"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </span>
      </p>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-share w-6 h-6"
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
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
          <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
        </svg>
      </button>
    </div>
    <MeetingComponent
      class="flex-1"
      :meetingId="meetingId"
      :token="meetingJWT"
      :meetingTitle="meetingTitle"
    />
  </div>
</template>
