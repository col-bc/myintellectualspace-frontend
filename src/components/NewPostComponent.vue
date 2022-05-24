<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PostComponent",

  setup() {
    const store = useStore();
    const router = useRouter();
    const formModel = reactive({
      content: "",
      location: "",
      file: "",
    });
    const alertModel = reactive({
      show: false,
      message: "",
    });

    const handleSubmit = () => {
      alertModel.show = false;
      alertModel.message = "";
      if (!formModel.content) {
        alertModel.show = true;
        alertModel.message = "Please enter something to post";
        return;
      }

      const formData = new FormData();
      formData.append("content", formModel.content);
      formData.append("location", formModel.location);
      formData.append(
        "file",
        document.querySelector("#new-post-image").files[0]
      );

      axios
        .post("http://localhost:5000/api/user/post/", formData, {
          headers: {
            Authorization: store.bearerToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          router.push({ name: "social" });
        })
        .catch((err) => {
          alertModel.show = true;
          alertModel.message = err.response.data;
          console.log(err.response.data);
        });
    };

    const setLocation = () => {
      axios
        .get("https://ipinfo.io/json", {
          headers: {
            Authorization: "Bearer c63cde3ca6489b",
          },
        })
        .then(({ data }) => {
          formModel.location = `${data.city}, ${data.country}`;
        })
        .catch(() => {
          alertModel.value = {
            show: true,
            message: "Could not get your location",
          };
        });
    };

    return {
      user: store.getUserData,
      formModel,
      handleSubmit,
      setLocation,
      alertModel,
    };
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit()" enctype="multipart/form-data">
    <div class="bg-white mb-4 w-full rounded-lg border border-gray-200 shadow">
      <!-- Alert -->
      <div
        v-show="alertModel.show"
        id="new-post-alert"
        class="m-2 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
        role="alert"
      >
        <span v-html="alertModel.message"></span>
      </div>

      <h3 class="text-lg font-medium text-gray-900 px-4 py-2 pb-0">
        Share with your network
      </h3>

      <div class="px-2 bg-white rounded-t-lg">
        <textarea
          rows="4"
          class="p-2 w-full text-gray-900 bg-white border-0 focus:outline-none focus:ring-0"
          placeholder="What's on your mind?"
          v-model="formModel.content"
        ></textarea>
      </div>
      <div class="flex justify-between items-center py-2 px-3 border-t">
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-send w-5 h-5 mr-4"
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
            <line x1="10" y1="14" x2="21" y2="3" />
            <path
              d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
            />
          </svg>
          Share
        </button>
        <div
          class="flex flex- flex-wrap-reverse justify-end pl-0 space-x-1 sm:pl-2"
        >
          <!-- Location -->
          <input
            type="text"
            class="w-52 appearance-none border-0 bg-transparent text-gray-900 text-sm text-right"
            disabled
            placeholder="Click icon to add location"
            v-model="formModel.location"
          />
          <!-- Set location -->
          <button
            type="button"
            @click="setLocation()"
            class="inline-flex justify-center p-2 text-gray-700 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-map-pin w-5 h-5"
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
              <circle cx="12" cy="11" r="3" />
              <path
                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
              />
            </svg>
          </button>
          <!-- Add image -->
          <input
            type="file"
            id="new-post-image"
            class="hidden"
            allow="png, jpg, tiff, gif"
          />
          <button
            type="button"
            class="inline-flex justify-center p-2 text-gray-700 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-photo w-5 h-5"
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
              <line x1="15" y1="8" x2="15.01" y2="8" />
              <rect x="4" y="4" width="16" height="16" rx="3" />
              <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
              <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
