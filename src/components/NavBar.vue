<template>
  <nav>
    <router-link to="/game" class="btn btn-sm">Today</router-link>
    <router-link to="/beliefs" class="btn btn-sm">Beliefs</router-link>
  </nav>
</template>

<style scoped>
.btn {
  background-color: gray;
}
.btn.router-link-active {
  background-color: black !important;
  color: white
}
</style>
