<script setup>
import {RouterLink, useRoute} from 'vue-router';
import { useUserStore } from '../../store/user.js'
import { onMounted } from 'vue';
// import axios from 'axios';
const route = useRoute();
const userStore = useUserStore();
console.log(userStore.user)


const logout = () => {
  userStore.logout();
}

onMounted(()=>{
  userStore.fetchUser()
});
</script>

<template>
  <nav class="overflow-hidden fixed top-0 left-0 right-0 shadow-md bg-white shadow-blue-200 z-50">
    <div class="nav flex flex-row items-center justify-between px-5 py-4">
    <RouterLink to="/" class="logo font-bold" >DetectiFy</RouterLink>
    <div v-if="userStore.user" class="flex flex-col items-center">
      <p>Welcome, <span class="name text-blue-500">{{ userStore.user.username }}</span> </p>
      <RouterLink to="/login" class="font-bold" @click="logout">Logout</RouterLink>
    </div>
   <div v-else v-if="route.path !== '/login' && route.path !== '/register'">
        <RouterLink to="/register">Register</RouterLink>
      </div>
  </div>
  </nav>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

 .logo{
  font-family: 'Nunito', sans-serif;
   /* font-weight: bold; */
   font-size: 1.5rem;
}

.name {
  /* font-family: 'Pacifico', cursive; */
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
}
.nav {
  box-shadow: 0 5px 20px #dadada;
}
</style>
