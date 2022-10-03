<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import adminService from "../../services/adminService";
import { handleError, handleSuccess } from "../../utils/globalFunctions";
import { computed } from "@vue/reactivity";

const addModal = ref(false);
const form = reactive({
  title: ""
});

function resetForm() {
  form.title = "";
  selectedNetwork.value = { id: 0, title: "" };
}

function showAddModal() {
  addModal.value = true;
}

function addNetwork() {
  adding.value = true;
  adminService
    .addNetwork(form)
    .then((res) => {
      handleSuccess(res);
      addModal.value = false;
      resetForm();
      getAllNetworks();
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
  setTimeout(getAllNetworks, 111);
});

interface NetworkModel {
  id: number;
  title: string;
}
const networks = ref<Array<NetworkModel>>([]);

const getting = ref(true);
function getAllNetworks() {
  getting.value = true;
  adminService
    .getAllNetworks()
    .then((res) => {
      networks.value = res.data.networks;
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
  if (!selectedNetwork.value.title) {
    return false;
  }

  return true;
});

const deleteModal = ref(false);
const deleting = ref(false);
const selectedNetwork = ref<NetworkModel>({ id: 0, title: "" });

function deleteNow() {
  deleting.value = true;
  adminService
    .deleteNetwork(selectedNetwork.value.id)
    .then((res) => {
      handleSuccess(res);
      deleteModal.value = false;
      resetForm();
      getAllNetworks();
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
    .editNetwork(selectedNetwork.value)
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
const filteredNetworks = computed(() => {
  if (!searchKeyword.value) {
    return networks.value;
  }

  return networks.value.filter((item) => {
    return (
      item.title.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) > -1
    );
  });
});
</script>

<template>
  <div>
    <div class="flex jc-between ai-center">
      <h3>Total Social Network</h3>
      <Button @click="showAddModal">
        <FIcon class="mr-1" icon="plus"></FIcon> Social Network
      </Button>
    </div>

    <InputText
      placeholder="Search Social Network"
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
          <th>TITLE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(network, i) in filteredNetworks" :key="network.id">
          <td>{{ i + 1 }}</td>
          <td>{{ network.title }}</td>
          <td>
            <div
              class="action-icon"
              @click="
                selectedNetwork = network;
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
                selectedNetwork = network;
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

    <Modal v-model="addModal" heading="Add Social Network">
      <form @submit.prevent="addNetwork">
        <div class="label">Social Network Title</div>
        <InputText
          v-model="form.title"
          placeholder="Enter Social Network"
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

    <Modal v-model="editModal" heading="Edit Social Network">
      <form @submit.prevent="editNow">
        <div class="label">Social Network Title</div>
        <InputText
          v-model="selectedNetwork.title"
          placeholder="Enter Social Network"
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
        <strong>{{ selectedNetwork.title }}.</strong> This can not be undone.
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
