<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ModalComponent",
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
    body: {
      type: String,
      default: "",
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => ["OK"],
    },
  },
  setup(props, { emit }) {
    const rShow = ref(props.show);
    const rTitle = ref(props.title);
    const rBody = ref(props.body);

    const onOptionSelected = (optionIdx) => {
      rShow.value = false;
      emit("onClose", optionIdx);
    };

    return {
      rTitle,
      rShow,
      rBody,
      rCloseable: props.closeable,
      rOptions: ref(props.options),

      onOptionSelected,
    };
  },
});
</script>

<template>
  <div
    v-show="rShow"
    class="bg-black opacity-70 fixed top-0 w-screen h-screen"
  ></div>
  <div
    tabindex="-1"
    v-show="rShow"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow-lg">
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-gray-900">{{ rTitle }}</h3>
          <!-- X -->
          <button
            type="button"
            v-show="rCloseable"
            @click="onOptionSelected(-1)"
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

        <div class="p-6">
          <slot></slot>
        </div>

        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200"
        >
          <button
            v-for="(option, idx) in rOptions"
            :key="idx"
            @click="onOptionSelected(idx)"
            type="button"
            :class="[
              idx == 0
                ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                : 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200',
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
