<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { VIDEOSDK_API_KEY } from "@/secrets";

export default defineComponent({
  name: "MeetingComponent",
  props: {
    meetingId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
    meetingTitle: {
      type: String,
      required: false,
      default: "",
    },
    meetingOptions: {
      type: Object,
      required: false,
      default: () => ({
        enableMic: true,
        enableCamera: true,
        enableWhiteboard: true,
        enableScreenShare: true,
        enableRaiseHand: true,
      }),
    },
  },
  setup(props) {
    const user = useStore().getUserData;
    onMounted(() => {
      const config = {
        name: user.first_name,
        meetingId: props.meetingId,
        apiKey: VIDEOSDK_API_KEY,
        token: props.token ? props.token : null,

        containerId: "meeting-stream-container",

        micEnabled: true,
        webcamEnabled: props.meetingOptions.enableCamera,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,

        chatEnabled: props.meetingOptions.enableChat,
        screenShareEnabled: props.meetingOptions.enableScreenShare,
        whiteboardEnabled: props.meetingOptions.enableWhiteboard,

        joinScreen: {
          visible: true,
          title: props.meetingTitle,
          meetingUrl: `http://localhost:8080/meetings/${props.meetingId}`,
          name: user.first_name,
        },

        participantCanLeave: true,
        redirectOnLeave: "http://localhost:8080/meetings/thanks",
        // ...
      };
      const meeting = new VideoSDKMeeting();
      meeting.init(config);
    });

  },
});
</script>
<template>
  <div class="w-screen h-screen" id="meeting-stream-container"></div>
</template>
