<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import { ref, onMounted } from "vue";
import { useStore } from "@/store";
import axios from "axios";

export default {
  name: "LoginView",
  components: { NavbarComponent },

  setup() {
    const store = useStore();
    const loginSuccessful = ref(false);
    onMounted(() => {

      if (store.isLoggedIn) {
        loginSuccessful.value = true;
      }
    });

    const formModel = ref({
      email: "",
      password: "",
      remember: false,
    });
    const alertModel = ref({
      shown: false,
      message: "",
    });
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleFormSubmit = () => {
      // Validate form and send login request to server
      if (!formModel.value.email || !formModel.value.password) {
        alertModel.value.message = "Please fill in all fields";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      const payload = {
        email: formModel.value.email,
        password_hash: formModel.value.password,
      };
      axios
        .post("http://localhost:5000/api/user/login", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            store.$patch("token", response.data.token);
            alertModel.value.message = "Login successful";
            alertModel.value.shown = true;
            loginSuccessful.value = true;
            scrollToTop();
          }
        })
        .catch(() => {
          alertModel.value.message = "Login failed. Please try again";
          alertModel.value.shown = true;
          formModel.value.password = "";
        });
    };

    return {
      formModel,
      alertModel,
      handleFormSubmit,
      loginSuccessful,
    };
  },
};
</script>

<template>
  <div class="min-h-screen mb-12">
    <NavbarComponent />

    <form
      v-show="!loginSuccessful"
      @submit.prevent="handleFormSubmit()"
      class="max-w-xl mx-auto px-4 py-6 mt-8 rounded-lg shadow-sm border bg-white border-slate-300 flex flex-col gap-y-6"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-900 text-center">
          Login to Your Intellectual Space
        </h1>
      </div>

      <!-- Alert -->
      <div
        v-show="alertModel.shown"
        class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
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
          <span class="font-medium">{{ alertModel.message }}</span>
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-slate-900"
          >Your email</label
        >
        <input
          type="email"
          v-model="formModel.email"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="burglar@thefellowship.com"
        />
      </div>
      <!-- Password -->
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-slate-900"
          >Your password</label
        >
        <input
          type="password"
          v-model="formModel.password"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="••••••••"
        />
      </div>
      <!-- Remember -->
      <div>
        <div class="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            v-model="formModel.remember"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
            >Remember me on this browser.</label
          >
        </div>
      </div>
      <!-- Submit -->
      <div class="pt-6">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center block w-full"
        >
          Secure Login
        </button>
      </div>
      <div>
        <p class="text-center">
          Don't have an account?
          <button
            @click="$router.push('/register')"
            class="text-blue-700 font-medium text-sm hover:underline"
          >
            Register here</button
          >.
        </p>
      </div>
    </form>

    <div
      v-show="loginSuccessful"
      class="max-w-xl mx-auto px-4 py-6 mt-8 rounded-lg shadow-sm border bg-white border-slate-300 flex flex-col gap-y-6"
    >
      <h1 class="text-3xl font-bold text-slate-900 text-center">
        Login successful
      </h1>
      <p class="text-center">
        Please play with the register and login process if you find any bugs add
        them on the issues tab on github and I'll start troubleshooting.
      </p>
      <img src="@/assets/icons/construction.svg" class="mx-auto w-64" />
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center w-64 mx-auto"
        @click="$router.push('/logout')"
      >
        Logout
      </button>
    </div>
  </div>
</template>