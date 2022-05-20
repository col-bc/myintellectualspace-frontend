<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ChoiceModalComponent",
  emits: ["onClose"],
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "default", // default, success, info, error
    },
    choices: {
      type: Array,
      default: () => ["OK", "Cancel"],
    },
  },
  setup(props, { emit }) {
    const closeDialog = (selection) => {
      emit("onClose", selection);
      show.value = false;
    };

    const show = ref(false);

    return {
      props,
      show,
      closeDialog,
    };
  },
});
</script>

<template>
  <div>
    <button @click="show = true" type="button" data-modal-toggle="choice-modal">
      <slot></slot>
    </button>

    <Teleport to="#modal-root">
      <!-- Overlay -->
      <div
        v-show="show"
        class="fixed top-0 left-0 w-screen h-screen bg-gray-900 opacity-60"
      ></div>
      <div
        v-show="show"
        id="choice-modal"
        tabindex="-1"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
      >
        <div
          class="relative p-4 w-full max-w-md h-full md:h-auto mx-auto mt-20"
        >
          <div class="relative bg-white rounded-lg shadow">
            <!-- X -->
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              @click="closeDialog(-1)"
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
            <div class="p-6 text-center">
              <svg
                class="mx-auto mb-4 w-14 h-14 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-900">
                {{ props.title }}
              </h3>
              <div class="flex flex-row items-center space-4 justify-center">
                <div v-for="(choice, idx) of props.choices" :key="choice">
                  <button
                    type="button"
                    @click="closeDialog(idx)"
                    class="inline-flex focus:ring-4 focus:outline-none font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2"
                    :class="{
                      'text-gray-900 bg-gray-100 hover:bg-gray-300': idx !== 0,
                      'bg-blue-600 hover:bg-blue-800 focus:ring-blue-400 text-white':
                        idx === 0 &&
                        (props.type === 'info' || props.type === 'default'),
                      'bg-green-600 hover:bg-green-800  focus:ring-green-400 text-white':
                        idx === 0 && props.type === 'success',
                      'bg-red-600 hover:bg-red-800 focus:ring-red-400 text-white':
                        idx === 0 && props.type === 'error',
                    }"
                  >
                    {{ choice }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
