<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useStore } from "@/store";

import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ProfileHomeView",
  components: { NavbarComponent },

  setup() {
    const tasks = ref([]);

    onMounted(() => {
      axios
        .get("http://localhost:5009/api/user/tasks")
        .then((response) => {
          tasks.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <p>{{ store }}</p>
</template>
