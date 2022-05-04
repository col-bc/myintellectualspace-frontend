<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "InputModalComponent",
  emits: ["onClose"],

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => ["OK", "Close"],
    },
    buttonText: {
      type: String,
      default: "See more",
    },
  },

  setup(props, { emit }) {
    const rShow = ref(props.show);
    const rTitle = ref(props.title);
    const rOptions = ref(props.options);
    const rButtonText = ref(props.buttonText);

    return {
      rShow,
      rTitle,
      rOptions,
      modalClose: (optionIdx) => {
        rShow.value = false;
        emit("onClose", optionIdx);
      },
      rButtonText,
    };
  },
});
</script>

<template>
  <button
    @click="rShow = true"
    class="py-0.5 px-1.5 text-xs font-medium text-center text-blue-700 border border-blue-700 rounded hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-pencil w-4 h-4"
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
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
  </button>
  <Teleport to="#modal-root">
    <!-- Overlay -->
    <div
      v-show="rShow"
      class="fixed top-0 left-0 w-screen h-screen bg-gray-900 opacity-60"
    ></div>
    <!-- Modal -->
    <div
      v-show="rShow"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 w-full h-full"
    >
      <div class="relative p-4 w-full max-w-4xl h-full md:h-auto mx-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex justify-between items-center p-5 rounded-t border-b">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              {{ rTitle }}
            </h3>
            <!-- X -->
            <button
              type="button"
              @click="modalClose(-1)"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                class="w-5 h-5"
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
          <!-- Modal body -->
          <div class="p-6"><slot></slot></div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200"
          >
            <button
              type="button"
              v-for="(opt, idx) in rOptions"
              :key="idx"
              @click="modalClose(idx)"
              :class="[
                idx === 0
                  ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  : 'text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10',
              ]"
            >
              {{ opt }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
