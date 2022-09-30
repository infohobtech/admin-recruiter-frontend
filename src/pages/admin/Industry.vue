<script lang="ts" setup>
import Button from "../../components/inputs/Button.vue";
// import InputText from "../../components/inputs/InputText.vue";
</script>

<template>
  <div>
    <div class="flex jc-between ai-center">
      <h2>Total Industry List</h2>
      <Button>
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
  </div>
</template>
