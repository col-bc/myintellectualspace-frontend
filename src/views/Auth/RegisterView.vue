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

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleFormSubmit = () => {
      // validate form
      if (formModel.value.password !== formModel.value.passwordConfirmation) {
        alertModel.value.message = "Passwords do not match";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
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
      if (formModel.value.educationLevel === "") {
        alertModel.value.message = "Please select an education level";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      if (formModel.value.profileType === "") {
        alertModel.value.message = "Please select a profile type";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      if (!formModel.value.terms) {
        alertModel.value.message = "You must agree to the terms and conditions";
        alertModel.value.shown = true;
        scrollToTop();
        return;
      }
      const payload = {
        first_name: formModel.value.firstName,
        last_name: formModel.value.lastName,
        email: formModel.value.email,
        password_hash: formModel.value.password,
        education_level: formModel.value.educationLevel,
        profile_type: formModel.value.profileType,
      };
      axios
        .post("http://localhost:5000/api/user/register", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          alertModel.value.message = "Successfully registered";
          alertModel.value.shown = true;
        })
        .catch((error) => {
          console.log(error);
          alertModel.value.message = "Error registering";
          alertModel.value.shown = true;
        });
    };

    return {
      formModel,
      alertModel,
      handleFormSubmit,
    };
  },
};
</script>

<template>
  <div class="min-h-screen mb-12">
    <NavbarComponent />

    <form
      @submit.prevent="handleFormSubmit()"
      class="max-w-xl mx-auto px-4 py-6 mt-8 rounded-lg shadow-sm border bg-white border-slate-300 flex flex-col gap-y-6"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-900 text-center pb-2">
          Welcome to your Intellectual Space
        </h1>
        <p class="text-slate-600 text-center pb-6">
          Let's get your account set up. Please answer all the questions below
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
          type="email"
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
            value=""
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
    </form>
  </div>
</template>
