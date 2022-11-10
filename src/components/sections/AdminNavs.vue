<script setup lang="ts">
const emit = defineEmits(["nav-click"]);
</script>

<template>
  <div class="admin-navs">
    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/dashboard"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="border-all"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Dashboard</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/jobseeker"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="users"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Jobseeker</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/industry"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="industry"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Industry</div>
      </div>
    </router-link>
    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/social-networks"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="network-wired"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Social Networks</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/skills"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="gears"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Skills</div>
      </div>
    </router-link>
    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/country-list/all"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="flag"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Coultry List</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/recruiter"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="user-group"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Recruiter</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/jobs"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="user-group"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Jobs</div>
      </div>
    </router-link>

    <router-link
      @click="emit('nav-click')"
      class="admin-nav d-block"
      to="/admin/settings"
    >
      <div class="flex ai-center">
        <div class="admin-nav__icon">
          <FIcon icon="gear"></FIcon>
        </div>
        <div class="admin-nav__text flex-1 ml-2">Settings</div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.admin-nav {
  padding: 11px 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #333333;
  border-radius: 8px;
  width: 100%;
}

.admin-nav:hover {
  background-color: rgb(249, 255, 255);
  /* font-weight: 700; */
}

.admin-nav__icon {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-navs .router-link-active,
.admin-navs .router-link-active:hover {
  background: #1aa7ec;
  font-weight: 700;
  color: #ffffff;
  border-radius: 8px;
  color: #fff;
}
</style>
