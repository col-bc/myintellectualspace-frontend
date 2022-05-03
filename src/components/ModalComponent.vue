<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ModalComponent",
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
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const showModal = ref(props.show === true ? true : false);
    const onModalClose = (option) => {
      showModal.value = false;
      emit("close", option);
    };
    return {
      onModalClose,
      props,
      showModal,
    };
  },
});
</script>

<template>
  <Teleport to="#modal-root">
    <div
      class="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60 z-10"
      v-if="showModal"
    ></div>
    <div
      v-if="showModal"
      id="large-modal"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex justify-between items-center p-5 rounded-t border-b">
            <h3 class="text-xl font-medium text-gray-900">
              {{ props.title }}
            </h3>
            <button
              type="button"
              @click="onModalClose(-1)"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x w=5 h-5"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4">
            <slot> </slot>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200"
          >
            <button
              v-for="(option, idx) in props.options"
              :key="idx"
              @click="onModalClose(idx)"
              type="button"
              :class="[
                idx === 0
                  ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  : 'text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
