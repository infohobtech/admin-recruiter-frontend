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
  selectedSkill.value = { id: 0, title: "" };
}

function showAddModal() {
  addModal.value = true;
}

function addSkill() {
  adding.value = true;
  adminService
    .addSkill(form)
    .then((res) => {
      handleSuccess(res);
      addModal.value = false;
      resetForm();
      getAllSkills();
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
  setTimeout(getAllSkills, 111);
});

interface SkillModel {
  id: number;
  title: string;
}
const skills = ref<Array<SkillModel>>([]);

const getting = ref(true);
function getAllSkills() {
  getting.value = true;
  adminService
    .getAllSkills()
    .then((res) => {
      skills.value = res.data.skills;
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
  if (!selectedSkill.value.title) {
    return false;
  }

  return true;
});

const deleteModal = ref(false);
const deleting = ref(false);
const selectedSkill = ref<SkillModel>({ id: 0, title: "" });

function deleteNow() {
  deleting.value = true;
  adminService
    .deleteSkill(selectedSkill.value.id)
    .then((res) => {
      handleSuccess(res);
      deleteModal.value = false;
      resetForm();
      getAllSkills();
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
    .editSkill(selectedSkill.value)
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
const filteredSkills = computed(() => {
  if (!searchKeyword.value) {
    return skills.value;
  }

  return skills.value.filter((item) => {
    return (
      item.title.toLowerCase().indexOf(searchKeyword.value.toLowerCase()) > -1
    );
  });
});
</script>

<template>
  <div>
    <div class="flex jc-between ai-center">
      <h3>Total Skill</h3>
      <Button @click="showAddModal">
        <FIcon class="mr-1" icon="plus"></FIcon> Skill
      </Button>
    </div>

    <InputText
      placeholder="Search Skill"
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
        <tr v-for="(skill, i) in filteredSkills" :key="skill.id">
          <td>{{ i + 1 }}</td>
          <td>{{ skill.title }}</td>
          <td>
            <div
              class="action-icon"
              @click="
                selectedSkill = skill;
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
                selectedSkill = skill;
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

    <Modal v-model="addModal" heading="Add Skill">
      <form @submit.prevent="addSkill">
        <div class="label">Skill Title</div>
        <InputText
          v-model="form.title"
          placeholder="Enter Skill Title"
          class="mt-2"
          required
        ></InputText>
        <hr class="mt-5" />

        <div class="mt-4 flex jc-end ai-center">
          <Button class="mr-4" outlined type="reset" @click="resetForm">
            Reset
          </Button>
          <Button type="submit" :loading="adding" :disabled="!isFormValid">
            Add Skill
          </Button>
        </div>
      </form>
    </Modal>

    <Modal v-model="editModal" heading="Edit Skill">
      <form @submit.prevent="editNow">
        <div class="label">Skill Title</div>
        <InputText
          v-model="selectedSkill.title"
          placeholder="Enter Skill Title"
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
        <strong>{{ selectedSkill.title }}.</strong> This can not be undone.
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
