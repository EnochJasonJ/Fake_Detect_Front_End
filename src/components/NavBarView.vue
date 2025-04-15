<script setup>
import {RouterLink} from 'vue-router';
import { ref,onMounted } from 'vue';
import axios from 'axios';
const token = localStorage.getItem('token');
const username = ref('');

const fetchUser = async() => {
  try {
      const response = await axios.get('http://localhost:8000/api/user/',{
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      username.value = response.data.username;
  } catch (error) {
    console.error(error)
  }
}

onMounted(()=>{
  if(token){
    fetchUser();
  }
});
</script>

<template>
  <nav>
    <div class="nav flex flex-row items-center justify-between px-5 py-4">
    <RouterLink to="/">Logo</RouterLink>
    <div v-if="token" class="flex flex-col items-center">
      <p>Welcome, {{ username }}</p>
      <RouterLink to="/login" class="font-bold">Logout</RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/register">Register</RouterLink>

    </div>
  </div>
  </nav>
</template>

<style scoped>
.nav {
  box-shadow: 0 5px 20px #dadada;
}
</style>
