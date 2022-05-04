<script>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useStore } from "@/store";

import { ref } from "vue";
import InputModalComponent from "@/components/InputModalComponent.vue";
import axios from "axios";

export default {
  name: "ProfileHomeView",
  components: { NavbarComponent, InputModalComponent },

  setup() {
    const tasks = ref([]);
    const store = useStore();

    const activeTab = ref(0);

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

    const postUserData = (data, key) => {
      var payload = store.getUserData;
      payload[key] = data;
      store.setUserData(payload);
      axios
        .post("http://localhost:5000/api/user/update", payload, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          },
        })
        .then((res) => {
          store.setUserData(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const selectedInterests = ref([]);
    const selectInterest = (interest) => {
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
      tasks,
      activeTab,
      userDataModel,
      postUserData,
      selectInterest,
      selectedInterests,
    };
  },
};
</script>

<template>
  <NavbarComponent />
  <div id="teleport-destination"></div>
  <div class="container flex flex-col lg:flex-row my-8 px-4 lg:space-x-8">
    <div class="flex flex-col w-full md:w-1/3">
      <!-- Profile Picture / Name / Settings Button -->
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center w-full mb-4">
          <h1 class="text-gray-900 font-bold text-4xl">
            {{ store.user.first_name }} {{ store.user.last_name }}
          </h1>
          <button
            class="bg-transparent text-gray-600 hover:bg-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded p-2 ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-settings w-8 h-8"
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
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <img
          class="rounded-xl aspect-square w-full h-full object-cover shadow lg:shadow-xl border border-white"
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
        <a href="#" class="mt-4 text-blue-700 hover:underline"
          >Change Profile Picture</a
        >
      </div>
    </div>
    <div class="flex flex-col md:w-2/3 mt-8 lg:mt-0">
      <!-- Tabs -->
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <button
              @click="activeTab = 0"
              :class="[
                activeTab === 0
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              About You
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="activeTab = 1"
              :class="[
                activeTab === 1
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              Your Posts
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="activeTab = 2"
              :class="[
                activeTab === 2
                  ? 'inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              Your Friends
            </button>
          </li>
          <a
            href="#"
            class="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center text-lg shadow-sm"
            >New Post
          </a>
        </ul>
      </div>

      <!-- Tab 0: About -->
      <div
        v-show="activeTab === 0"
        class="p-4 grid grid-flow-row lg:grid-cols-2 gap-6"
      >
        <!-- Bio -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Name</h3>
            <input-modal-component
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
            </input-modal-component>
          </div>
          <p class="text-gray-800 min-w-24 p-2">
            <span v-show="!store.user.bio || store.user.bio.length === 0">
              You haven't added a bio yet.
            </span>
            {{ store.user.bio }}
          </p>
        </div>
        <!-- Name -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Bio</h3>
            <input-modal-component
              title="Update Profile"
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
              <div class="grid grid-cols-2 space-x-6">
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
            </input-modal-component>
          </div>
          <p class="text-gray-800 min-w-24 p-2">
            <span v-show="!store.user.first_name || !store.user.last_name">
              You haven't added your name yet.
            </span>
            {{ store.user.first_name }} {{ store.user.last_name }}
          </p>
        </div>
        <!-- Occupation -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">
              Occupation
            </h3>
            <input-modal-component
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
            </input-modal-component>
          </div>
          <p class="text-gray-800 min-w-24 p-2">
            <span v-show="!store.user.occupation">
              You haven't added an occupation yet.
            </span>
            {{ store.user.occupation }}
          </p>
        </div>
        <!-- Location -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Location</h3>
            <input-modal-component
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
            </input-modal-component>
          </div>
          <p class="text-gray-800 min-w-24 p-2">
            <span v-show="!store.user.location">
              You haven't added your location yet.
            </span>
            {{ store.user.location }}
          </p>
        </div>
        <!-- Website -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Website</h3>
            <input-modal-component
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
            </input-modal-component>
          </div>
          <p class="text-gray-80 min-w-24 p-2">
            <span v-show="!store.user.website">
              You haven't added a website yet.
            </span>
            {{ store.user.website }}
          </p>
        </div>
        <!-- Education -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Education</h3>
            <input-modal-component
              title="Update Profile"
              :options="['Save', 'Cancel']"
              @on-close="
                (idx) => {
                  if (idx === 0) {
                    postUserData(
                      userDataModel.education_level,
                      'education_level'
                    );
                    postUserData(
                      userDataModel.education_major,
                      'education_major'
                    );
                    postUserData(
                      userDataModel.education_institution,
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
            </input-modal-component>
          </div>
          <p class="text-gray-800 min-w-24 p-2">
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
        </div>
        <!-- Interests -->
        <div
          class="flex flex-col bg-white p-2 border border-gray-300 shadow-sm rounded-lg"
        >
          <div class="flex flex-row w-ful bg-gray-200 rounded p-1">
            <h3 class="text-gray-800 font-medium text-xl mr-auto">Interests</h3>
            <input-modal-component
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
              <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-6"
              >
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
                    'bg-gray-200':
                      selectedInterests.includes('Computer Science'),
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
                  <img
                    src="@/assets/interests/law.svg"
                    class="w-26"
                    alt="art"
                  />
                  <p class="font-medium text-lg">Law</p>
                </div>
                <div
                  class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                  :class="{
                    'bg-gray-200': selectedInterests.includes('Mathematics'),
                  }"
                  @click="selectInterest('Mathematics')"
                >
                  <img
                    src="@/assets/interests/math.svg"
                    class="w-26"
                    alt="art"
                  />
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
                  <img
                    src="@/assets/interests/vet.svg"
                    class="w-26"
                    alt="art"
                  />
                  <p class="font-medium text-lg">Veterinarian Medicine</p>
                </div>
                <div
                  class="p-2 rounded-lg hover:bg-gray-200 flex flex-col items-center cursor-pointer"
                  :class="{
                    'bg-gray-200':
                      selectedInterests.includes(`Women's Studies`),
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
            </input-modal-component>
          </div>
          <p class="text-gray-600 text-sm min-w-24 p-2">
            <span v-show="!store.user.interests">
              You haven't added your education yet.
            </span>
            {{ store.user.interests }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
