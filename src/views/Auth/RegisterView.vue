<script>
import { ref } from "vue";
import axios from "axios";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "HomeView",
  components: { NavbarComponent },

  setup() {
    const formModel = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      educationLevel: "",
      profileType: "",
      terms: false,
    });
    const alertModel = ref({
      shown: false,
      message: "",
    });
    const registrationSuccessful = ref(false);

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleFormSubmit = () => {
      // validate form and show alert if invalid otherwise post to server

      // Check if passwords are the same
      if (formModel.value.password !== formModel.value.passwordConfirmation) {
        alertModel.value.message = "Passwords do not match";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      // Check if any fields are empty
      if (
        !formModel.value.firstName ||
        !formModel.value.lastName ||
        !formModel.value.email ||
        !formModel.value.password ||
        !formModel.value.passwordConfirmation
      ) {
        alertModel.value.message = "Please fill out all fields";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      // Check if password is compliant
      if (
        formModel.value.password.length < 8 ||
        formModel.value.password.match("[0-9]").length <= 0 ||
        formModel.value.password.match("[A-Z]").length <= 0
      ) {
        alertModel.value.message =
          "Password must be at least 8 characters long and contain at least one number and one capital letter";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      // Check if education level is selected
      if (formModel.value.educationLevel === "") {
        alertModel.value.message = "Please select an education level";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      // Check if profile type is selected
      if (formModel.value.profileType === "") {
        alertModel.value.message = "Please select a profile type";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      //Check if terms are accepted
      if (formModel.value.terms === false) {
        alertModel.value.message = "You must agree to the terms and conditions";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      const payload = {
        first_name: formModel.value.firstName,
        last_name: formModel.value.lastName,
        email: formModel.value.email,
        password: formModel.value.password,
        education_level: formModel.value.educationLevel,
        profile_type: formModel.value.profileType,
      };
      axios
        .post("http://localhost:5000/api/auth/register", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            registrationSuccessful.value = true;
            scrollToTop();
          }
        })
        .catch((error) => {
          console.log(error, error.response);
          if (error.response.status === 400) {
            alertModel.value.message = error.response.data.message;
            alertModel.value.shown = true;
            scrollToTop();
          }
          alertModel.value.message = "Error registering";
          alertModel.value.shown = true;
          scrollToTop();
        });
    };

    return {
      formModel,
      alertModel,
      handleFormSubmit,
      registrationSuccessful,
    };
  },
};
</script>

<template>
  <div class="min-h-screen mb-12">
    <NavbarComponent />

    <form
      @submit.prevent="handleFormSubmit()"
      v-show="!registrationSuccessful"
      class="max-w-lg mx-auto px-4 py-6 mt-12 rounded-xl shadow border bg-white border-gray-200 flex flex-col gap-y-6"
    >
      <div>
        <img src="@/assets/images/register.svg" alt="Register" class="w-full max-h-64 mx-auto mb-6" />
        <h1 class="text-3xl text-center font-bold text-slate-900 pb-2">
          We're glad to have you at Intellectual Space
        </h1>
        <p class="text-slate-600 text-center pb-12">
          We meed some information about you to create your account. Please fill
          in the form below to get started.
        </p>
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

      <!-- First Name -->
      <div>
        <label class="block mb-2 text-sm font-medium text-slate-900"
          >Your first name</label
        >
        <input
          type="text"
          v-model="formModel.firstName"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Bilbo"
        />
      </div>
      <!-- Last Name -->
      <div>
        <label class="block mb-2 text-sm font-medium text-slate-900"
          >Your last name</label
        >
        <input
          type="text"
          v-model="formModel.lastName"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Baggins"
        />
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
        <p class="text-sm leading-tight text-gray-600 mt-1">
          Must be at least 8 characters long and include at least one number and
          one uppercase letter. Special characters are permitted but not
          required.
        </p>
      </div>
      <!-- Password Confirmation -->
      <div>
        <label
          for="passwordConfirmation"
          class="block mb-2 text-sm font-medium text-slate-900"
          >Confirm your password</label
        >
        <input
          type="password"
          v-model="formModel.passwordConfirmation"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="••••••••"
        />
      </div>
      <!-- Education Level -->
      <div>
        <label
          for="educationLevel"
          class="block mb-2 text-sm font-medium text-slate-900"
          >Your education level</label
        >
        <select
          v-model="formModel.educationLevel"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select your education level</option>
          <option value="highschool">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="postgraduate">Postgraduate</option>
        </select>
      </div>
      <!-- Profile Type -->
      <div>
        <label
          for="profileType"
          class="block mb-2 text-sm font-medium text-slate-900"
          >Your profile type</label
        >
        <select
          v-model="formModel.profileType"
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select your profile type</option>
          <option value="employer">Employer</option>
          <option value="nonprofit">Non-Profit</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="tutor">Tutor</option>
        </select>
      </div>
      <!-- Terms -->
      <div>
        <div class="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            v-model="formModel.terms"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
            >I agree with the
            <a href="#" class="text-blue-600 hover:underline">
              terms and conditions
            </a>
            and
            <a href="#" class="text-blue-600 hover:underline"> privacy policy</a
            >.</label
          >
        </div>
      </div>
      <!-- Submit -->
      <div class="pt-6">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center block w-full"
        >
          Create my account
        </button>
      </div>
      <div>
        <p class="text-center">
          Already have an account?
          <button
            @click="$router.push('/login')"
            class="text-blue-700 font-medium text-sm hover:underline"
          >
            Login here</button
          >.
        </p>
      </div>
    </form>

    <!-- Success -->
    <div
      v-show="registrationSuccessful"
      class="max-w-xl mx-auto px-4 py-6 mt-8 rounded-lg shadow-sm border bg-white border-slate-300 flex flex-col gap-y-6"
    >
      <h1 class="text-4xl font-bold text-center text-gray-900">
        Registration successful!
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-52 text-green-500 p-2 bg-green-200 mx-auto rounded-full"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-center text-gray-900">
        You can now log in with your email and password.
      </p>
      <button
        type="button"
        @click="$router.push('/login')"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Login
      </button>
    </div>
  </div>
</template>
