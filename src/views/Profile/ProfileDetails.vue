<script>
import InputModalComponent from "@/components/InputModalComponent.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import axios from "axios";

export default defineComponent({
  name: "ProfileDetails",
  components: { InputModalComponent },

  setup() {
    const store = useStore();

    const userDataModel = ref({
      firstName: store.getUserData.first_name,
      lastName: store.getUserData.last_name,
      bio: store.getUserData.bio,
      occupation: store.getUserData.occupation,
      location: store.getUserData.location,
      website: store.getUserData.website,
      educationLevel: store.getUserData.education_level,
      educationMajor: store.getUserData.education_major,
      educationInstitution: store.getUserData.education_institution,
      interests: store.getUserData.interests,
    });
    const alertModel = ref({
      show: false,
      message: "",
    });
    const postUserData = (data, key) => {
      // Update the user data in the database
      var payload = store.getUserData;
      payload[key] = data;
      console.log(payload);
      store.setUserData(payload);
      delete payload.email;
      delete payload.auth_token;
      delete payload.token_expiration;
      delete payload.created_at;
      delete payload.updated_at;
      axios
        .post("http://localhost:5000/api/user/update", payload, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          },
        })
        .then((res) => {
          store.setUserData(res.data.user);
          alertModel.value = {
            show: true,
            message: "Successfully updated your profile",
          };
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const selectedInterests = ref([]);
    const selectInterest = (interest) => {
      // Handle interest toggle logic
      if (selectedInterests.value.length > 4) {
        return;
      }
      if (selectedInterests.value.includes(interest)) {
        selectedInterests.value = selectedInterests.value.filter(
          (item) => item !== interest
        );
      } else {
        selectedInterests.value.push(interest);
      }
    };

    return {
      store,
      userDataModel,
      postUserData,
      selectInterest,
      selectedInterests,
    };
  },
});
</script>

<template>
  <!-- Bio -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">Bio</h5>
    <p class="text-gray-800 w-auto mr-auto">
      <span v-show="!store.user.bio || store.user.bio.length === 0">
        You haven't added a bio yet.
      </span>
      {{ store.user.bio }}
    </p>
    <InputModalComponent
      title="Update Profile"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.bio, 'bio');
          }
        }
      "
    >
      <textarea
        rows="4"
        v-model="userDataModel.bio"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Update your bio"
      ></textarea>
    </InputModalComponent>
  </div>
  <!-- Name -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">Name</h5>
    <p class="text-gray-800 mr-auto">
      <span v-show="!store.user.first_name || !store.user.last_name">
        You haven't added your name yet.
      </span>
      {{ store.user.first_name }} {{ store.user.last_name }}
    </p>
    <InputModalComponent
      title="Update your name"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.firstName, 'first_name');
            postUserData(userDataModel.lastName, 'last_name');
          }
        }
      "
    >
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          v-model="userDataModel.firstName"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="First name"
        />
        <input
          type="text"
          v-model="userDataModel.lastName"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Last name"
        />
      </div>
    </InputModalComponent>
  </div>
  <!-- Occupation -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">
      Occupation
    </h5>
    <p class="text-gray-800 mr-auto">
      <span v-show="!store.user.occupation">
        You haven't added an occupation yet.
      </span>
      {{ store.user.occupation }}
    </p>
    <InputModalComponent
      title="Update Profile"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.occupation, 'occupation');
          }
        }
      "
    >
      <input
        type="text"
        v-model="userDataModel.occupation"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Occupation"
      />
      <p class="text-gray-600 pt-2">
        List your job title and company or industry.
      </p>
    </InputModalComponent>
  </div>
  <!-- Location -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">Location</h5>
    <p class="text-gray-800 mr-auto">
      <span v-show="!store.user.location">
        You haven't added your location yet.
      </span>
      {{ store.user.location }}
    </p>
    <InputModalComponent
      title="Update Profile"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.location, 'location');
          }
        }
      "
    >
      <input
        type="text"
        v-model="userDataModel.location"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Location"
      />
      <p class="pt-2 text-gray-600">
        List your city, state or country. For your safety, do not list your full
        address.
      </p>
    </InputModalComponent>
  </div>
  <!-- Website -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">Website</h5>
    <p class="text-gray-800 mr-auto">
      <span v-show="!store.user.website">
        You haven't added a website yet.
      </span>
      {{ store.user.website }}
    </p>
    <InputModalComponent
      title="Update Profile"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.website, 'website');
          }
        }
      "
    >
      <input
        type="text"
        v-model="userDataModel.website"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Location"
      />
      <p class="pt-2 text-gray-600">Ex. https://www.example.com.</p>
    </InputModalComponent>
  </div>
  <!-- Education -->
  <div class="py-1.5 border-b border-gray-200 flex items-start">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">
      Education
    </h5>
    <p class="text-gray-800 mr-auto">
      <span
        v-show="
          !store.user.education_level &&
          !store.user.education_major &&
          !store.user.education_institution
        "
      >
        You haven't added your education yet.
      </span>
      {{ store.user.education_level }} {{ store.user.education_major }}
      <span v-if="store.user.education_institution"> at </span
      >{{ store.user.education_institution }}
    </p>
    <InputModalComponent
      title="Update Profile"
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(userDataModel.educationLevel, 'education_level');
            postUserData(userDataModel.educationMajor, 'education_major');
            postUserData(
              userDataModel.educationInstitution,
              'education_institution'
            );
          }
        }
      "
    >
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option :selected="store.getUserData.education_level === ''">
          Choose an education level
        </option>
        <option
          :selected="store.getUserData.education_level === 'HS'"
          value="HS"
        >
          High School / G.E.D
        </option>
        <option
          :selected="store.getUserData.education_level === 'enrolled'"
          value="enrolled"
        >
          Currently Enrolled
        </option>
        <option
          :selected="store.getUserData.education_level === 'AA'"
          value="AA"
        >
          Associate (AA, AS)
        </option>
        <option
          :selected="store.getUserData.education_level === 'BA'"
          value="BA"
        >
          Bachelor (BA, BS)
        </option>
        <option
          :selected="store.getUserData.education_level === 'MS'"
          value="MS"
        >
          Graduate (MA, MS)
        </option>
        <option
          :selected="store.getUserData.education_level === 'JD'"
          value="JD"
        >
          Doctorate (JD, PhD)
        </option>
      </select>
      <input
        type="text"
        v-model="userDataModel.education_major"
        class="my-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Your major"
      />
      <input
        type="text"
        v-model="userDataModel.education_institution"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Your School"
      />
    </InputModalComponent>
  </div>
  <!-- Interests -->
  <div class="py-1 flex items-center">
    <h5 class="text-gray-800 text-sm font-semibold uppercase mr-6">
      Interests
    </h5>
    <p class="text-gray-800 mr-auto">
      <span v-show="!store.user.interests">
        You haven't added your education yet.
      </span>
      {{ store.user.interests }}
    </p>
    <InputModalComponent
      title="Select up to 5 interests."
      :options="['Save', 'Cancel']"
      @on-close="
        (idx) => {
          if (idx === 0) {
            postUserData(selectedInterests.value, 'interests');
          }
        }
      "
    >
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-6">
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Astronomy'),
          }"
          @click="selectInterest('Astronomy')"
        >
          <img src="@/assets/interests/astronomy.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Astronomy</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Biology'),
          }"
          @click="selectInterest('Biology')"
        >
          <img src="@/assets/interests/biology.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Biology</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Chemistry'),
          }"
          @click="selectInterest('Chemistry')"
        >
          <img src="@/assets/interests/chemistry.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Chemistry</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Computer Science'),
          }"
          @click="selectInterest('Computer Science')"
        >
          <img
            src="@/assets/interests/computer_science.svg"
            class="w-26"
            alt="art"
          />
          <p class="font-medium text-lg">Computer Science</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Engineering'),
          }"
          @click="selectInterest('Engineering')"
        >
          <img
            src="@/assets/interests/engineering.svg"
            class="w-26"
            alt="art"
          />
          <p class="font-medium text-lg">Engineering</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('English'),
          }"
          @click="selectInterest('English')"
        >
          <img src="@/assets/interests/english.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">English</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('History'),
          }"
          @click="selectInterest('History')"
        >
          <img src="@/assets/interests/history.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">History</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Law'),
          }"
          @click="selectInterest('Law')"
        >
          <img src="@/assets/interests/law.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Law</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Mathematics'),
          }"
          @click="selectInterest('Mathematics')"
        >
          <img src="@/assets/interests/math.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Mathematics</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Medicine'),
          }"
          @click="selectInterest('Medicine')"
        >
          <img src="@/assets/interests/medicine.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Medicine</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Psychology'),
          }"
          @click="selectInterest('Psychology')"
        >
          <img src="@/assets/interests/psychology.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Psychology</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Religion'),
          }"
          @click="selectInterest('Religion')"
        >
          <img src="@/assets/interests/religion.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Religious Studies</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes('Veterinary Medicine'),
          }"
          @click="selectInterest('Veterinary Medicine')"
        >
          <img src="@/assets/interests/vet.svg" class="w-26" alt="art" />
          <p class="font-medium text-lg">Veterinarian Medicine</p>
        </div>
        <div
          class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
          :class="{
            'bg-gray-200': selectedInterests.includes(`Women's Studies`),
          }"
          @click="selectInterest(`Women's Studies`)"
        >
          <img
            src="@/assets/interests/womens_studies.svg"
            class="w-26"
            alt="art"
          />
          <p class="font-medium text-lg">Women's Studies</p>
        </div>
      </div>
    </InputModalComponent>
  </div>
</template>
