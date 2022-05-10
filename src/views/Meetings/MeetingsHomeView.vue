<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useStore } from "@/store";
import axios from "axios";
import { useRouter } from "vue-router";

import { ref, watch } from "vue";

export default {
  name: "MeetingsHomeView",
  components: { NavbarComponent },

  setup() {
    const store = useStore();
    const router = useRouter();

    const view = ref(0);
    const nextIsLoading = ref(false);

    const meetingId = ref("");
    const meetingTitle = ref("");
    const meetingJWT = ref("");

    const alert = ref({
      show: false,
      message: "",
    });
    watch(alert.value, (newVal) => {
      if (newVal.show) {
        window.scrollTo(0, 0);
        setTimeout(() => {
          alert.value.show = false;
          alert.value.message = "";
        }, 7500);
      }
    });
    function scrollToAlert() {
      window.scrollTo(0, 0);
    }

    const handleHostMeeting = () => {
      if (meetingTitle.value === "") {
        alert.value = {
          show: true,
          message: "Please enter a valid meeting title",
        };
        scrollToAlert();
        return;
      } else {
        // get jwt from api
        nextIsLoading.value = true;

        axios
          .get("http://localhost:5000/api/meetings/jwt", {
            headers: {
              Authorization: store.bearerToken,
            },
          })
          .then((res) => {
            meetingJWT.value = res.data.token;

            // create meeting room with VideoSDK
            axios
              .post(
                "https://api.videosdk.live/v1/meetings",
                {},
                {
                  headers: {
                    Authorization: meetingJWT.value,
                  },
                }
              )
              .then((res) => {
                console.log(meetingJWT.value);
                router.push({
                  name: "host-meeting",
                  params: {
                    meetingId: res.data.meetingId,
                    meetingTitle: meetingTitle.value,
                    meetingJWT: meetingJWT.value,
                  },
                });
                console.log(res);
                nextIsLoading.value = false;
              })
              .catch((ex) => {
                console.log(ex);
              });
          })
          .catch((err) => {
            console.log(err);
            alert.value = {
              show: true,
              message:
                "Error getting authentication token. Please try again later",
            };
            scrollToAlert();
            return;
          });
      }
    };

    const handleJoinMeeting = () => {
      if (meetingId.value === "") {
        alert.value.message = "Please enter a valid meeting ID";
        alert.value.show = true;
        scrollToAlert();
        return;
      }
    };

    return {
      view,
      meetingId,
      meetingTitle,
      meetingJWT,
      alert,
      handleJoinMeeting,
      handleHostMeeting,
      nextIsLoading,
    };
  },
};
</script>

<template>
  <navbar-component />
  <!-- Alert -->
  <div
    v-show="alert.show"
    class="flex p-4 text-sm text-red-700 bg-red-100"
    role="alert"
  >
    <div class="container flex items-center px-2 mx-auto">
      <svg
        class="inline flex-shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <p>{{ alert.message }}</p>
    </div>
  </div>

  <div class="container grid grid-cols-1 md:grid-cols-4 mx-auto">
    <div class="md:col-span-3">
      <!-- View 0: Join/Host -->
      <div
        v-show="view === 0"
        class="container px-4 mt-8 flex flex-col max-w-xl mx-auto"
      >
        <h1 class="text-2xl font-bold text-slate-900 text-center">
          Meetings Dashboard
        </h1>
        <img
          src="@/assets/images/meetings.svg"
          alt="Meeting"
          class="block w-full max-h-64 mx-auto my-12"
        />
        <button
          @click="view = 1"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Host a meeting
        </button>
        <span class="text-xl font-bold text-center my-4 text-gray-700">OR</span>
        <div class="flex flex-col items-center">
          <div class="w-full">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Meeting ID</label
            >
            <input
              type="text"
              v-model="meetingId"
              class="w-full mb-4 flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            />
          </div>
          <button
            type="button"
            @click="handleJoinMeeting()"
            class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-full"
          >
            Join a meeting
          </button>
        </div>
      </div>
      <!-- View 1: Configure Meeting -->
      <div
        v-show="view === 1"
        class="container px-4 mt-8 flex flex-col max-w-xl mx-auto"
      >
        <h1 class="text-2xl font-bold text-slate-900 text-center">
          Configure your meeting
        </h1>
        <img
          src="@/assets/images/meeting-settings.svg"
          alt="Meeting"
          class="block w-full max-h-64 mx-auto my-12"
        />
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Meeting Title</label
            >
            <input
              v-model="meetingTitle"
              type="text"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.50"
              placeholder="Meeting Title"
            />
          </div>
          <div
            class="p-2 bg-white border-gray-200 border rounded-lg grid grid-cols-2"
          >
            <h5
              class="font-medium text-gray-800 col-span-2 pb-4 flex items-center gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-adjustments w-6 h-6"
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
                <circle cx="6" cy="10" r="2" />
                <line x1="6" y1="4" x2="6" y2="8" />
                <line x1="6" y1="12" x2="6" y2="20" />
                <circle cx="12" cy="16" r="2" />
                <line x1="12" y1="4" x2="12" y2="14" />
                <line x1="12" y1="18" x2="12" y2="20" />
                <circle cx="18" cy="7" r="2" />
                <line x1="18" y1="4" x2="18" y2="5" />
                <line x1="18" y1="9" x2="18" y2="20" />
              </svg>
              <span>Meeting Features</span>
            </h5>
            <div class="flex items-center text-gray-600xs mb-4">
              <input
                checked="true"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-600">Enable Video</label>
            </div>
            <div class="flex items-center text-gray-600xs">
              <input
                checked="true"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-600">Enable Voice</label>
            </div>
            <div class="flex items-center text-gray-600xs mb-4">
              <input
                checked="true"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-600"
                >Enable Screen Share</label
              >
            </div>
            <div class="flex items-center text-gray-600xs">
              <input
                checked="true"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-600"
                >Enable Whiteboard</label
              >
            </div>
          </div>
        </div>
        <div class="inline-flex rounded-md mt-8" role="group">
          <button
            @click="view = 0"
            type="button"
            class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 flex items-center gap-x-4 flex-1 justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-arrow-narrow-left w-5 h-5"
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="9" y2="16" />
              <line x1="5" y1="12" x2="9" y2="8" />
            </svg>
            Back
          </button>
          <button
            type="button"
            @click="handleHostMeeting()"
            class="py-2 px-4 text-sm font-medium rounded-lg text-gray-900 bg-white border border-l-0 rounded-l-none border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 flex items-center gap-x-4 flex-1 justify-center"
          >
            <template v-if="!nextIsLoading">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-narrow-right w-5 h-5"
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>
            </template>
            <template v-else>
              <div class="text-center">
                <svg
                  role="status"
                  class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </template>
          </button>
        </div>
      </div>
    </div>
    <div
      class="mt-8 flex flex-col bg-white p-4 rounded-lg border border-gray-200"
    >
      <h1 class="font-bold p-2 rounded bg-gray-100 text-gray-800">
        Upcoming Meetings
      </h1>
      <div class="w-full h-full flex justify-center items-center">
        <p class="text-center text-gray-700">No upcoming meetings</p>
      </div>
    </div>
  </div>
</template>
