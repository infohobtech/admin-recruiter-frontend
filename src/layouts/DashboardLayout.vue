<template>
  <div class="dashboard">
    <div class="dashboard__left">
      <div class="dashboard__brand">
        <img src="/img/logos/logo-sm.png" alt="" />
      </div>
      <div class="dashboard__navigation">
        <slot name="navigation"> #navigation</slot>
      </div>
    </div>
    <div class="dashboard__right">
      <div class="dashboard__top">
        <slot name="header"> #header</slot>
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
  width: 226px;
  z-index: 3;
  display: flex;
  background-color: #fff;
  flex-direction: column;
}

.dashboard__brand {
  padding: 20px;
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
}
@media screen and (max-width: 700px) {
  .dashboard__left {
    display: none;
  }
  .dashboard__left.responsive {
    display: flex;
  }
  .dashboard__main {
    padding: 10px;
  }
}
</style>
