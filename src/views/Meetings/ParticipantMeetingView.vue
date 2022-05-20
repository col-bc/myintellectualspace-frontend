<script>
import { useRoute } from "vue-router";
import MeetingComponent from "@/components/MeetingComponent.vue";

export default {
  components: {
    MeetingComponent,
  },
  setup() {
    const route = useRoute();
    const { meetingId, } = route.params;

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
      copyContent,
    };
  },
};
</script>

<template>
  <div class="min-h-screen">
    <nav
      class="px-4 py-1.5 text-black bg-gray-100 flex items-center justify-between"
    >
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Leave Meeting
      </button>
    </nav>
    {{ (meetingId, meetingJWT) }}
    <div class="flex flex-col">
      <MeetingComponent :meetingId="meetingId" />
    </div>
  </div>
</template>
