<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useStore } from "@/store";

import { ref } from "vue";
import axios from "axios";

export default {
  name: "EditProfile",
  components: { NavbarComponent },

  setup() {
    const store = useStore();
    const formModel = ref({
      firstName: "",
      lastName: "",
      occupation: "",
      educationLevel: "",
      bio: "",
      interests: "",
      organizationName: "",
      yearsInBusiness: "",
      password: "",
    });

    const alertModel = ref({
      shown: false,
      message: "",
      type: ""
    });
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleFormSubmit = () => {
      const payload = {
        first_name: formModel.value.firstName,
        last_name: formModel.value.lastName,
        occupation: formModel.value.occupation,
        education_level: formModel.value.educationLevel,
        bio: formModel.value.bio,
        interests: formModel.value.interests,
        organization_name: formModel.value.organizationName,
        years_in_business: formModel.value.yearsInBusiness,
      };
      axios
        .post("http://localhost:5000/api/user/update", payload, {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        })
        .then(() => {
          alertModel.value.shown = true;
          alertModel.value.message = "Profile updated successfully";
          alertModel.value.type = "success";
          // Set last fetch date to old date to force a refresh
          store.$patch((state) => {
            state.updatedAt = new Date(2000, 1, 1);
          });
          return true;
        })
        .catch(() => {
          alertModel.value.shown = true;
          alertModel.value.message = "Error updating profile";
          alertModel.value.type = "error";
          scrollToTop();
          return false;
        });
      scrollToTop();
    };

    return {
      store,
      formModel,
      alertModel,
      handleFormSubmit,
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <div
    class="container mx-auto flex flex-col md:flex-row px-2 md:px-4 mt-8 md:gap-x-4 lg:gap-x-6"
  >
    <!-- Image -->
    <div class="md:w-1/2 mb-6 md:mb-0">
      <img
        class="w-full object-cover aspect-square rounded-2xl shadow-lg"
        src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="profile picture"
      />
    </div>

    <!-- Form -->
    <div
      class="md:w-1/2 bg-white h-full p-4 border border-gray-300 rounded-2xl shadow"
    >
      <!-- Alert -->
      <div
        v-show="alertModel.shown"
        class="flex p-4 mb-4 text-sm  rounded-lg"
        role="alert"
        :class="{
          'text-red-700 bg-red-100 ': alertModel.type === 'error',
          'text-green-700 bg-green-100': alertModel.type === 'success',
        }"
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

      <h1 class="text-2xl font-bold text-center mb-8">Profile Details</h1>

      <form @submit.prevent="handleFormSubmit()" class="flex flex-col gap-y-6">
        <div class="grid grid-cols-2 gap-x-4">
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
        </div>
        <!-- Bio -->
        <div>
          <label class="block mb-2 text-sm font-medium text-slate-900"
            >Your bio</label
          >
          <textarea
            type="text"
            v-model="formModel.bio"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows="4"
            placeholder="Bio"
          ></textarea>
        </div>
        <!-- Interests -->
        <div>
          <label class="block mb-2 text-sm font-medium text-slate-900"
            >Your interests
          </label>
          <button
            type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Update interests
          </button>
        </div>
        <!-- Occupation -->
        <div>
          <label class="block mb-2 text-sm font-medium text-slate-900"
            >Your occupation</label
          >
          <input
            type="text"
            v-model="formModel.occupation"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Burglar"
          />
        </div>
        <!-- Education Level -->
        <div>
          <label class="block mb-2 text-sm font-medium text-slate-900"
            >Your education level</label
          >
          <input
            type="text"
            v-model="formModel.educationLevel"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="BS in Computer Science"
          />
        </div>
        <!-- Employer details -->
        <div
          v-show="store.accountType === 'Employer'"
          class="border border-gray-300 rounded-xl"
        >
          <h1 class="p-4 bg-gray-300 rounded-lg font-bold mb-4">
            Employer Profile Details
          </h1>
          <div class="px-4 pb-6">
            <!-- Business Name -->
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-900"
                >Your business name</label
              >
              <input
                type="text"
                v-model="formModel.organization_name"
                class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <!-- Years in business -->
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-900 mt-6"
                >In business since</label
              >
              <input
                type="number"
                v-model="formModel.yearsInBusiness"
                class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="2000"
              />
            </div>
          </div>
        </div>
        <!-- Submit -->
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center block w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>
