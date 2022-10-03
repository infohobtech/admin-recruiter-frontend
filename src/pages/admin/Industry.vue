<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import adminService from "../../services/adminService";
import Button from "../../components/inputs/Button.vue";
import { handleError, handleSuccess } from "../../utils/globalFunctions";
import { computed } from "@vue/reactivity";

const addModal = ref(false);
const form = reactive({
  title: ""
});

function resetForm() {
  form.title = "";
  selectedIndustry.value = { id: 0, title: "" };
}

function showAddModal() {
  console.log("Showing...");
  addModal.value = true;
}

function addIndustry() {
  adding.value = true;
  adminService
    .addIndustry(form)
    .then((res) => {
      handleSuccess(res);
      addModal.value = false;
      resetForm();
      getAllIndustries();
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
  setTimeout(getAllIndustries, 111);
});

interface IndustryModel {
  id: number;
  title: string;
}
const industries = ref<Array<IndustryModel>>([]);

const getting = ref(true);
function getAllIndustries() {
  getting.value = true;
  adminService
    .getAllIndustries()
    .then((res) => {
      industries.value = res.data.industries;
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      getting.value = false;
    });
}

const isFormValid = computed(() => {
  if (!form.title) {
    return false;
  }

  return true;
});
const isEditFormValid = computed(() => {
  if (!selectedIndustry.value.title) {
    return false;
  }

  return true;
});

const deleteModal = ref(false);
const deleting = ref(false);
const selectedIndustry = ref<IndustryModel>({ id: 0, title: "" });

function deleteNow() {
  deleting.value = true;
  adminService
    .deleteIndustry(selectedIndustry.value.id)
    .then((res) => {
      handleSuccess(res);
      deleteModal.value = false;
      resetForm();
      getAllIndustries();
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
    .editIndustry(selectedIndustry.value)
    .then((res) => {
      handleSuccess(res);
      editModal.value = false;
      resetForm();
      // getAllIndustries();
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      editing.value = false;
    });
}

const searchKeyword = ref("");
const filteredIndustries = computed(() => {
  if (!searchKeyword.value) {
    return industries.value;
  }

  return industries.value.filter((item) => {
    return (
      item.title.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) > -1
    );
  });
});
</script>

<template>
  <div>
    <div class="flex jc-between ai-center">
      <h3>Total Industry List</h3>
      <Button @click="showAddModal">
        <FIcon class="mr-1" icon="plus"></FIcon> Create Industry
      </Button>
    </div>

    <InputText
      placeholder="Search Industry listing"
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
          <th>ID</th>
          <th>TITLE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="industry in filteredIndustries" :key="industry.id">
          <td>{{ industry.id }}</td>
          <td>{{ industry.title }}</td>
          <td>
            <div
              class="action-icon"
              @click="
                selectedIndustry = industry;
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
                selectedIndustry = industry;
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

    <Modal v-model="addModal" heading="Create Industry">
      <form @submit.prevent="addIndustry">
        <div class="label">Industry Title</div>
        <InputText
          v-model="form.title"
          placeholder="Enter Industry Tile"
          class="mt-2"
          required
        ></InputText>
        <hr class="mt-5" />

        <div class="mt-4 flex jc-end ai-center">
          <Button class="mr-4" outlined type="reset" @click="resetForm">
            Reset
          </Button>
          <Button type="submit" :loading="adding" :disabled="!isFormValid">
            Create Industry
          </Button>
        </div>
      </form>
    </Modal>

    <Modal v-model="editModal" heading="Edit Industry">
      <form @submit.prevent="editNow">
        <div class="label">Industry Title</div>
        <InputText
          v-model="selectedIndustry.title"
          placeholder="Enter Industry Tile"
          class="mt-2"
          required
        ></InputText>
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
        <strong>{{ selectedIndustry.title }}.</strong> This can not be undone.
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
</template>
