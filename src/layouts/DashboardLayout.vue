<script setup lang="ts">
import { onMounted, ref } from "vue";
import AdminHeader from "../components/sections/AdminHeader.vue";
import AdminNavs from "../components/sections/AdminNavs.vue";

const collapsed = ref(false);

function fixCollapse() {
  if (innerWidth <= 720) {
    collapsed.value = true;
  }
}

onMounted(() => {
  fixCollapse();

  addEventListener("resize", (event) => {
    fixCollapse();
  });
});
</script>

<template>
  <div class="dashboard">
    <div
      class="dashboard__left"
      :class="{ 'dashboard__left--collapsed': collapsed }"
    >
      <div class="dashboard__brand">
        <img src="/img/logos/logo-sm.png" alt="" />
        <div class="d-inline-block d-md-none">
          <FIcon icon="bars" @click="collapsed = true"></FIcon>
        </div>
      </div>
      <div class="dashboard__navigation">
        <!-- <slot name="navigation"> #navigation</slot> -->
        <AdminNavs @nav-click="collapsed = true"></AdminNavs>
      </div>
    </div>
    <div class="dashboard__right">
      <div class="dashboard__top">
        <!-- <slot name="header"> #header</slot> -->
        <AdminHeader @navIconClick="collapsed = !collapsed"></AdminHeader>
      </div>
      <div class="dashboard__main">
        <slot name="main"> #main</slot>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
}
.dashboard__left {
  left: 0px;
  width: 244px;
  z-index: 3;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  transition: all 0.25s;
}

.dashboard__left--collapsed {
  left: -244px !important;
}

.dashboard__brand {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
}

.dashboard__navigation {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.dashboard__right {
  flex: 1;
  width: 222px;
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.dashboard__top {
  height: 55px;
  z-index: 2;
  display: flex;
  padding: 0 50px;
}
.dashboard__main {
  flex: 1;
  padding: 20px 50px;
  background-color: #f9f9f9;
  border-radius: 38px 0px 0px 38px;
  overflow-y: auto;
  margin-bottom: 30px;
  position: relative;
}

@media screen and (max-width: 700px) {
  .dashboard__left {
    /* display: none; */
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.12);
  }
  .dashboard__left.responsive {
    display: flex;
  }

  .dashboard__top {
    padding: 18px;
  }
  .dashboard__main {
    padding: 20px;
    border-radius: 0;
    margin-bottom: 0;
  }
}
</style>
