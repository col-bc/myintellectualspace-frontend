<script>
import { defineComponent, onMounted } from "vue";
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
      required: true,
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
    onMounted(() => {
      const config = {
        name: props.screenName,
        meetingId: props.meetingId,
        apiKey: VIDEOSDK_API_KEY,
        token: props.token,

        containerId: "meeting-stream-container",

        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,

        chatEnabled: true,
        screenShareEnabled: true,

        joinScreen: {
          visible: true,
          title: props.meetingTitle,
          name: ''
        },
        /* Other Feature Properties */
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
