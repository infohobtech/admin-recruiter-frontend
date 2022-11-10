<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import adminService from "../../services/adminService";
import { handleError, handleSuccess } from "../../utils/globalFunctions";
import { computed } from "@vue/reactivity";

import CountryStates from "./CountryStates.vue";

const router = useRouter();
const route = useRoute();

const addModal = ref(false);
const form = reactive({
  name: "",
  phoneCode: "",
  shortName: ""
});

function resetForm() {
  form.name = "";
  form.phoneCode = "";
  form.shortName = "";
  selectedCountry.value = {
    name: "",
    phoneCode: "",
    shortName: ""
  };
}

function showAddModal() {
  addModal.value = true;
}

function addCountry() {
  adding.value = true;
  adminService
    .addCountry(form)
    .then((res) => {
      handleSuccess(res);
      addModal.value = false;
      resetForm();
      getAllCountries();
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      adding.value = false;
    });
}

const adding = ref(false);

onMounted(() => {
  setTimeout(getAllCountries, 111);
});

interface CountryModel {
  name: string;
  phoneCode: string;
  shortName: string;
  id?: number;
}
const countries = ref<Array<CountryModel>>([]);

const getting = ref(true);
function getAllCountries() {
  getting.value = true;
  adminService
    .getAllCountries()
    .then((res) => {
      countries.value = res.data.countries;
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      getting.value = false;
    });
}

const isFormValid = computed(() => {
  if (!form.name || !form.shortName || !form.phoneCode) {
    return false;
  }
  return true;
});

const isEditFormValid = computed(() => {
  if (
    !selectedCountry.value.name ||
    !selectedCountry.value.shortName ||
    !selectedCountry.value.phoneCode
  ) {
    return false;
  }

  return true;
});

const deleteModal = ref(false);
const deleting = ref(false);
const selectedCountry = ref<CountryModel>({
  id: 0,
  name: "",
  shortName: "",
  phoneCode: ""
});

function deleteNow() {
  deleting.value = true;
  adminService
    .deleteCountry(selectedCountry.value.id!!)
    .then((res) => {
      handleSuccess(res);
      deleteModal.value = false;
      resetForm();
      getAllCountries();
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      deleting.value = false;
    });
}

const editModal = ref(false);
const editing = ref(false);

function editNow() {
  editing.value = true;
  adminService
    .editCountry(selectedCountry.value)
    .then((res) => {
      handleSuccess(res);
      editModal.value = false;
      resetForm();
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      editing.value = false;
    });
}

const searchKeyword = ref("");
const filteredCountries = computed(() => {
  if (!searchKeyword.value) {
    return countries.value;
  }

  return countries.value.filter((item) => {
    return (
      item.name.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) > -1 ||
      item.shortName.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) >
        -1
    );
  });
});

function manageCountry(country: CountryModel) {
  selectedCountry.value = country;
  router.push(`/admin/country-list/${country.id}`);
}

const selectedCountryId = computed(() => {
  return route.params.countryId;
});
</script>

<template>
  <div v-if="selectedCountryId === 'all'">
    <div class="flex jc-between ai-center">
      <h3>Total Country</h3>
      <Button @click="showAddModal">
        <FIcon class="mr-1" icon="plus"></FIcon>
        <span class="d-md-inline-block d-none">Add </span> Country
      </Button>
    </div>

    <InputText
      placeholder="Search Country"
      class="mt-3"
      v-model="searchKeyword"
      clearable
    >
      <template #prepend>
        <FIcon class="mr-1" icon="search"></FIcon>
      </template>
    </InputText>

    <ContentLoader v-if="getting" class="mt-4"> </ContentLoader>

    <table class="data mt-4" v-else>
      <thead>
        <tr>
          <th>INDEX</th>
          <th>COUNTRY NAME</th>
          <th>SHORT CODE</th>
          <th>COUNTRY CODE</th>
          <th>MANAGE STATE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(country, i) in filteredCountries" :key="country.id">
          <td>{{ i + 1 }}</td>
          <td>{{ country.name }}</td>
          <td>{{ country.shortName }}</td>
          <td>{{ country.phoneCode }}</td>
          <td>
            <div class="action-icon" @click="manageCountry(country)">
              <FIcon icon="pen-to-square"></FIcon>
              <div class="ml-1">Manage</div>
            </div>
          </td>
          <td>
            <div
              class="action-icon"
              @click="
                selectedCountry = country;
                editModal = true;
              "
            >
              <FIcon icon="pen-to-square"></FIcon>
              <div class="ml-1">Edit</div>
            </div>
          </td>
          <td>
            <div
              class="action-icon action-icon--delete"
              @click="
                selectedCountry = country;
                deleteModal = true;
              "
            >
              <FIcon icon="trash"></FIcon>
              <div class="ml-1">Delete</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-model="addModal" heading="Add Country">
      <form @submit.prevent="addCountry">
        <div class="label">Country Name</div>
        <InputText
          v-model="form.name"
          placeholder="Enter Country Title"
          class="mt-2"
          required
        ></InputText>

        <div class="row mt-4 gap-6">
          <div class="col-md-6">
            <div class="label">Country Short Code</div>

            <InputText
              v-model="form.shortName"
              placeholder="Enter Country Short Name"
              class="mt-2"
              required
            ></InputText>
          </div>

          <div class="col-md-6">
            <div class="label">Country Code</div>

            <InputText
              v-model="form.phoneCode"
              placeholder="Enter Country Code"
              class="mt-2"
              required
            ></InputText>
          </div>
        </div>

        <hr class="mt-5" />

        <div class="mt-4 flex jc-end ai-center">
          <Button class="mr-4" outlined type="reset" @click="resetForm">
            Reset
          </Button>
          <Button type="submit" :loading="adding" :disabled="!isFormValid">
            Add Country
          </Button>
        </div>
      </form>
    </Modal>

    <Modal v-model="editModal" heading="Edit Country">
      <form @submit.prevent="editNow">
        <div class="label">Country Name</div>
        <InputText
          v-model="selectedCountry.name"
          placeholder="Enter Country Title"
          class="mt-2"
          required
        ></InputText>

        <div class="row mt-4 gap-6">
          <div class="col-md-6">
            <div class="label">Country Short Code</div>

            <InputText
              v-model="selectedCountry.shortName"
              placeholder="Enter Country Short Name"
              class="mt-2"
              required
            ></InputText>
          </div>

          <div class="col-md-6">
            <div class="label">Country Code</div>

            <InputText
              v-model="selectedCountry.phoneCode"
              placeholder="Enter Country Code"
              class="mt-2"
              required
            ></InputText>
          </div>
        </div>

        <hr class="mt-5" />

        <div class="mt-4 flex jc-end ai-center">
          <Button type="submit" :loading="editing" :disabled="!isEditFormValid">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>

    <Modal v-model="deleteModal" heading="Are you sure?">
      <p>
        Are you sure you want to delete
        <strong>{{ selectedCountry.name }}.</strong> This can not be undone.
      </p>
      <div class="mt-4 flex jc-end ai-center">
        <Button class="mr-4" outlined type="reset" @click="deleteModal = false">
          No
        </Button>
        <Button type="submit" :loading="deleting" @click="deleteNow">
          Yes
        </Button>
      </div>
    </Modal>
  </div>

  <CountryStates
    v-else
    :country-code="selectedCountry.phoneCode"
    :country-name="selectedCountry.name"
    :short-code="selectedCountry.shortName"
    :country-id="selectedCountryId + ''"
  ></CountryStates>
</template>
