<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import adminService from "../../services/adminService";
import { handleError, handleSuccess } from "../../utils/globalFunctions";
import { computed } from "@vue/reactivity";

interface StateModel {
  id?: number;
  name: string;
}

const props = defineProps({
  countryId: {
    type: String,
    default: ""
  },
  countryName: {
    type: String,
    default: ""
  },
  countryCode: {
    type: String,
    default: ""
  },
  shortCode: {
    type: String,
    default: ""
  }
});

const addModal = ref(false);
const form = reactive({
  name: ""
});

function resetForm() {
  form.name = "";
  selectedState.value = {
    name: ""
  };
}

function showAddModal() {
  addModal.value = true;
}

function addState() {
  adding.value = true;
  adminService
    .addState(props.countryId, form)
    .then((res) => {
      handleSuccess(res);
      addModal.value = false;
      resetForm();
      getAllStates();
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
  setTimeout(getAllStates, 111);
});

const states = ref<Array<StateModel>>([]);

const getting = ref(true);
function getAllStates() {
  getting.value = true;
  adminService
    .getAllStates(props.countryId)
    .then((res) => {
      states.value = res.data.states;
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      getting.value = false;
    });
}

const isFormValid = computed(() => {
  if (!form.name) {
    return false;
  }
  return true;
});

const isEditFormValid = computed(() => {
  if (!selectedState.value.name) {
    return false;
  }

  return true;
});

const deleteModal = ref(false);
const deleting = ref(false);
const selectedState = ref<StateModel>({
  id: 0,
  name: ""
});

function deleteNow() {
  deleting.value = true;
  adminService
    .deleteState(selectedState.value.id!!)
    .then((res) => {
      handleSuccess(res);
      deleteModal.value = false;
      resetForm();
      getAllStates();
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
    .editState(selectedState.value)
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
const filteredStates = computed(() => {
  if (!searchKeyword.value) {
    return states.value;
  }

  return states.value.filter((item) => {
    return (
      item.name.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) > -1
    );
  });
});
</script>

<template>
  <div>
    <div class="country-info">
      <div class="flex ai-center jc-between">
        <div class="pr-2">
          Country Name: {{ countryName }}
          <br />

          Country Code: {{ countryCode }}, Country Sort Code: {{ shortCode }}
          <br />
        </div>

        <router-link to="/admin/country-list/all" :style="{ minWidth: '44px' }">
          <FIcon icon="angle-left" class="mr-1"></FIcon>
          Back <span class="d-md-inline-block d-none"> to countriy list </span>
        </router-link>
      </div>
    </div>

    <div class="state-info">
      <div class="flex jc-between ai-center">
        <h3>Total State</h3>
        <Button @click="showAddModal">
          <FIcon class="mr-1" icon="plus"></FIcon>
          <span class="d-md-inline-block d-none">Add </span> State
        </Button>
      </div>

      <InputText
        placeholder="Search State"
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
            <th>STATE NAME</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(state, i) in filteredStates" :key="state.id">
            <td>{{ state.name }}</td>

            <td>
              <div
                class="action-icon"
                @click="
                  selectedState = state;
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
                  selectedState = state;
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

      <Modal v-model="addModal" heading="Add State">
        <form @submit.prevent="addState">
          <div class="label">State Name</div>
          <InputText
            v-model="form.name"
            placeholder="Enter State Name"
            class="mt-2"
            required
          ></InputText>

          <hr class="mt-5" />

          <div class="mt-4 flex jc-end ai-center">
            <Button class="mr-4" outlined type="reset" @click="resetForm">
              Reset
            </Button>
            <Button type="submit" :loading="adding" :disabled="!isFormValid">
              Add State
            </Button>
          </div>
        </form>
      </Modal>

      <Modal v-model="editModal" heading="Edit State">
        <form @submit.prevent="editNow">
          <div class="label">State Name</div>
          <InputText
            v-model="selectedState.name"
            placeholder="Enter State Name"
            class="mt-2"
            required
          ></InputText>

          <hr class="mt-5" />

          <div class="mt-4 flex jc-end ai-center">
            <Button
              type="submit"
              :loading="editing"
              :disabled="!isEditFormValid"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      <Modal v-model="deleteModal" heading="Are you sure?">
        <p>
          Are you sure you want to delete
          <strong>{{ selectedState.name }}.</strong> This can not be undone.
        </p>
        <div class="mt-4 flex jc-end ai-center">
          <Button
            class="mr-4"
            outlined
            type="reset"
            @click="deleteModal = false"
          >
            No
          </Button>
          <Button type="submit" :loading="deleting" @click="deleteNow">
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<style>
.country-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 33px;
  z-index: 999;
  height: 125px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
}

.state-info {
  padding-top: 125px;
}

@media only screen and (max-width: 600px) {
  .country-info,
  .country-info a {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
