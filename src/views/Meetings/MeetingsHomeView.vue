<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { VIDEOSDK_API_KEY, VIDEOSDK_API_SECRET } from "@/secrets";
import { useStore } from "@/store";
import jwt from "jsonwebtoken";
import axios from "axios";

import { ref, watch } from "vue";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

export default {
  name: "MeetingsHomeView",
  components: { NavbarComponent },

  setup() {
    const store = useStore();
    // eslint-disable-next-line no-unused-vars
    const views = ["Dashboard", "Setup", "Host", "Participant"];
    const view = ref(0);

    const meetingId = ref("");
    const meetingTitle = ref("");
    const meetingScreenName = ref(
      store.getUserData.first_name + " " + store.getUserData.last_name
    );

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

    const startMeeting = async (mId, mUsername) => {
      const config = {
        name: mUsername,
        meetingId: mId,
        apiKey: VIDEOSDK_API_KEY,
        containerId: null,
        redirectOnLeave: "/meetings",
        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        chatEnabled: true,
        screenShareEnabled: true,
        pollEnabled: true,
        whiteboardEnabled: true,
        raiseHandEnabled: true,
        recordingEnabled: true,
        recordingEnabledByDefault: false,
        recordingWebhookUrl: "https://www.videosdk.live/callback",
        // recordingAWSDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path
        brandingEnabled: true,
        brandLogoURL: "@/assets/images/Intellectual.png",
        brandName: "Intellectual Space",
        participantCanLeave: true, // if false, leave button won't be visible
        // Live stream meeting to youtube
        livestream: {
          autoStart: true,
          outputs: [
            // {
            //   url: "rtmp://x.rtmp.youtube.com/live2",
            //   streamKey: "<STREAM KEY FROM YOUTUBE>",
            // },
          ],
        },
        permissions: {
          askToJoin: false, // Ask joined participants for entry in meeting
          toggleParticipantMic: true, // Can toggle other participant's mic
          toggleParticipantWebcam: true, // Can toggle other participant's webcam
          removeParticipant: true, // Remove other participant from meeting
          endMeeting: true, // End meeting for all participant
          drawOnWhiteboard: true, // Can Draw on whiteboard
          toggleWhiteboard: true, // Can toggle whiteboard
          toggleRecording: true, // Can toggle recording
        },
        joinScreen: {
          visible: true, // Show the join screen ?
          title: "Intellectual Space Meetings", // Meeting title
          meetingUrl: window.location.href, // Meeting joining url
        },
        pin: {
          allowed: true, // participant can pin any participant in meeting
          layout: "SPOTLIGHT", // meeting layout - GRID | SPOTLIGHT | SIDEBAR
        },
        leftScreen: {
          // visible when redirect on leave not provieded
          actionButton: {
            // optional action button
            label: "Video SDK Live", // action button label
            href: "https://videosdk.live/", // action button href
          },
        },
      };
      const meeting = new VideoSDKMeeting();

      await meeting.init(config);
    };

    const handleHostMeeting = () => {
      if (meetingTitle.value === "" || meetingScreenName.value === "") {
        alert.value = {
          show: true,
          message: "Please enter a valid meeting title and screen name",
        };
      } else {
        let jwt = generateVSDKJWT();
        axios
          .post("https://api.videosdk.live/v1/meetings", null, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              meetingId.value = res.data.meetingId;
              startMeeting(res.data.meetingId, meetingScreenName.value);
            }
          })
          .catch((err) => {
            console.log(err);
            alert.value = {
              show: true,
              message: "Something went wrong, please try again later",
            };
          });
      }
    };

    function generateVSDKJWT() {
      const options = {
        expiresIn: "10m",
        algorithm: "HS256",
      };
      const payload = {
        apikey: VIDEOSDK_API_KEY,
        version: 2,
        roles: ["CRAWLER"],
      };
      const token = jwt.sign(payload, VIDEOSDK_API_SECRET, options);
      return token;
    }

    const handleJoinMeeting = () => {
      if (meetingId.value === "" || meetingScreenName.value === "") {
        alert.value.message =
          "Please enter a valid meeting ID and screen name.";
        alert.value.show = true;
        return;
      }
      startMeeting(meetingId.value, meetingScreenName.value);
    };

    return {
      view,
      meetingId,
      meetingScreenName,
      meetingTitle,
      alert,
      handleJoinMeeting,
      handleHostMeeting,
      startMeeting,
    };
  },
};
</script>

<template>
  <navbar-component />
  <!-- Alert -->
  <div
    v-show="alert.show"
    class="flex p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg max-w-2xl mx-auto"
    role="alert"
  >
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
    <div>
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
          <input
            type="text"
            v-model="meetingScreenName"
            class="w-full mb-4 flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 rounded-r-none"
            placeholder="Screen Name"
          />
          <input
            type="text"
            v-model="meetingId"
            class="w-full mb-4 flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            placeholder="Enter meeting ID"
          />
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
            <input
              v-model="meetingTitle"
              type="text"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.50"
              placeholder="Meeting Title"
            />
          </div>
          <div>
            <input
              v-model="meetingScreenName"
              type="text"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.50"
              placeholder="Screen Name"
            />
          </div>
          <div
            class="p-2 bg-white border-gray-200 border rounded-lg grid grid-cols-2"
          >
            <h5 class="font-medium text-gray-800 col-span-2 pb-4">
              Meeting Features
            </h5>
            <div class="flex items-center mb-4">
              <input
                type="checkbox"
                value=""
                checked="true"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Enable Video</label
              >
            </div>
            <div class="flex items-center">
              <input
                checked="true"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Enable Voice</label
              >
            </div>
            <div class="flex items-center mb-4">
              <input
                type="checkbox"
                value=""
                checked="true"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Enable Screen Share</label
              >
            </div>
            <div class="flex items-center">
              <input
                checked=""
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            class="py-2 px-4 text-sm font-medium rounded-r-lg text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 flex items-center gap-x-4 flex-1 justify-center"
          >
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
