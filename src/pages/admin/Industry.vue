<script lang="ts" setup>
import { reactive, ref } from "vue";
import adminService from "../../services/adminService";
import Button from "../../components/inputs/Button.vue";
import { handleError, handleSuccess } from "../../utils/globalFunctions";

const addModal = ref(true);
const form = reactive({
  title: ""
});

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
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      adding.value = false;
    });
}

const adding = ref(false);
</script>

<template>
  <div>
    <div class="flex jc-between ai-center">
      <h2>Total Industry List</h2>
      <Button @click="showAddModal">
        <FIcon class="mr-1" icon="plus"></FIcon> Create Industry
      </Button>
    </div>

    <InputText placeholder="Search Industry listing" class="mt-3">
      <template #prepend>
        <FIcon class="mr-1" icon="search"></FIcon>
      </template>
    </InputText>

    <table class="data mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="i in 9" :key="i">
          <td>IN001</td>
          <td>Accounting/Finance(443)</td>
          <td>
            <div class="action-icon">
              <FIcon icon="pen-to-square"></FIcon>
              <div class="ml-1">Edit</div>
            </div>
          </td>
          <td>
            <div class="action-icon action-icon--delete">
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
          <Button class="mr-4" outlined>Reset</Button>
          <Button type="submit" :loading="adding">Create Industry</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
