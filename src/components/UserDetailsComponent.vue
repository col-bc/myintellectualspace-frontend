<script>
import FormModelComponent from "@/components/FormModelComponent.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import axios from "axios";

export default defineComponent({
  name: "ProfileDetails",
  components: { FormModelComponent },

  setup() {
    const store = useStore();
    const isExpanded = ref(true);

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

    /*
    √const profilePicture = ref(null);
    const updateProfilePic = () => {
      // post multipart form data to update profile picture
      const formData = new FormData();
      formData.append("file", profilePicture.value);
      axios
        .post("http://localhost:5000/api/user/set-avatar", formData, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          },
        })
        .then((res) => {
          store.setUserData(res.data.user);
          alertModel.value = {
            show: true,
            message: "Profile picture updated successfully",
            type: "success",
          };
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const profilePicturePreview = ref(null);
    const onProfilePicInputChange = (e) => {
      profilePicture.value = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePicturePreview.value = e.target.result;
      };
      reader.readAsDataURL(profilePicture.value);
    };
    */

    return {
      store,
      isExpanded,
      userDataModel,
      postUserData,
      selectInterest,
      selectedInterests,
    };
  },
});
</script>

<template>
  <div
    class="flex flex-col w-full p-4 bg-white rounded-lg border-gray-200 border shadow"
  >
    <button
      @click="isExpanded = !isExpanded"
      class="w-full inline-flex text-gray-800 text-lg font-semibold p-2 border-b border-gray-200 hover:bg-gray-100 rounded-t"
    >
      <span>About {{ store.user.first_name }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevron-down ml-auto w-6 h-6 transition transform"
        :class="{ 'rotate-180': isExpanded }"
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
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <div v-if="isExpanded">
      <!-- Bio -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Bio
          </h5>
          <FormModelComponent
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 w-auto mr-auto py-2">
          <span
            v-show="!store.user.bio || store.user.bio.length === 0"
            class="text-gray-500"
          >
            Add a bio to tell people more about yourself and your interests
          </span>
          {{ store.user.bio }}
        </p>
      </div>
      <!-- Name -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Name
          </h5>
          <FormModelComponent
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span
            v-show="!store.user.first_name || !store.user.last_name"
            class="text-gray-500"
          >
            Anonymous
          </span>
          {{ store.user.first_name }} {{ store.user.last_name }}
        </p>
      </div>
      <!-- Occupation -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Occupation
          </h5>
          <FormModelComponent
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span v-show="!store.user.occupation" class="text-gray-500">
            Not listed
          </span>
          {{ store.user.occupation }}
        </p>
      </div>
      <!-- Location -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Location
          </h5>
          <FormModelComponent
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
              List your city, state or country. For your safety, do not list
              your full address.
            </p>
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span v-show="!store.user.location" class="text-gray-500">
            Unknown
          </span>
          {{ store.user.location }}
        </p>
      </div>
      <!-- Website -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Website
          </h5>
          <FormModelComponent
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span v-show="!store.user.website" class="text-gray-500">
            No website
          </span>
          {{ store.user.website }}
        </p>
      </div>
      <!-- Education -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Education
          </h5>
          <FormModelComponent
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span
            v-show="
              !store.user.education_level &&
              !store.user.education_major &&
              !store.user.education_institution
            "
            class="text-gray-500"
          >
            No education added
          </span>
          {{ store.user.education_level }} {{ store.user.education_major }}
          <span v-if="store.user.education_institution"> at </span
          >{{ store.user.education_institution }}
        </p>
      </div>
      <!-- Interests -->
      <div class="p-2 border-b border-gray-200 flex flex-col items-start">
        <div class="inline-flex items-center w-full">
          <h5 class="text-gray-800 text-sm font-semibold uppercase mr-auto">
            Interests
          </h5>
          <FormModelComponent
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
                <img
                  src="@/assets/interests/astronomy.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">Astronomy</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes('Biology'),
                }"
                @click="selectInterest('Biology')"
              >
                <img
                  src="@/assets/interests/biology.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">Biology</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes('Chemistry'),
                }"
                @click="selectInterest('Chemistry')"
              >
                <img
                  src="@/assets/interests/chemistry.svg"
                  class="w-26"
                  alt="art"
                />
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
                <img
                  src="@/assets/interests/english.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">English</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes('History'),
                }"
                @click="selectInterest('History')"
              >
                <img
                  src="@/assets/interests/history.svg"
                  class="w-26"
                  alt="art"
                />
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
                <img
                  src="@/assets/interests/medicine.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">Medicine</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes('Psychology'),
                }"
                @click="selectInterest('Psychology')"
              >
                <img
                  src="@/assets/interests/psychology.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">Psychology</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes('Religion'),
                }"
                @click="selectInterest('Religion')"
              >
                <img
                  src="@/assets/interests/religion.svg"
                  class="w-26"
                  alt="art"
                />
                <p class="font-medium text-lg">Religious Studies</p>
              </div>
              <div
                class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                :class="{
                  'bg-gray-200': selectedInterests.includes(
                    'Veterinary Medicine'
                  ),
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
          </FormModelComponent>
        </div>
        <p class="text-gray-800 mr-auto py-2">
          <span v-show="!store.user.interests" class="text-gray-500">
            No interests selected
          </span>
          {{ store.user.interests }}
        </p>
      </div>
      <div class="py-2 flex items-center">
        <FormModelComponent
          buttonText="Change Profile Picture"
          :options="['Upload Picture', 'Cancel']"
          :title="'Upload Profile Picture'"
          :show="false"
        >
          <form
            @submit.prevent="updateProfilePic()"
            enctype="multipart/form-data"
            id="profile-pic-form"
          >
            <div class="flex justify-center items-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
              >
                <div
                  class="flex flex-col justify-center items-center pt-5 pb-6"
                >
                  <svg
                    v-if="!profilePicturePreview"
                    class="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <img
                    v-else
                    :src="profilePicturePreview"
                    class="max-h-64 object-cover object-center"
                  />
                  <p class="mb-2 text-sm text-gray-5000">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  @change="onProfilePicInputChange($event)"
                  type="file"
                  class="hidden"
                />
              </label>
            </div>
            <button
              type="submit"
              class="bg-transparent text-gray-600 hover:bg-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded p-2 ml-auto"
            >
              Change
            </button>
          </form>
        </FormModelComponent>
      </div>
    </div>
  </div>
</template>
