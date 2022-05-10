<script>
import { useRoute } from "vue-router";
import MeetingComponent from "@/components/MeetingComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  components: {
    NavbarComponent,
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
    <NavbarComponent />
    <div class="p-4 text-blue-700 bg-blue-100 flex items-center">
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
    </div>
    <MeetingComponent
      class="flex-1"
      :meetingId="meetingId"
      :token="meetingJWT"
      :meetingTitle="meetingTitle"
    />
  </div>
</template>
