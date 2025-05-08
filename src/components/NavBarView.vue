<script setup>
import {RouterLink} from 'vue-router';
import { useUserStore } from '../../store/user.js'
import { onMounted } from 'vue';
// import axios from 'axios';

const userStore = useUserStore();
console.log(userStore.user)

// const fetchUser = async() => {
//   try {
//       const response = await axios.get('http://localhost:8000/api/user/',{
//         headers: {
//           'Authorization': `Token ${token.value}`
//         }
//       });
//       username.value = response.data.username;
//       console.log(username.value);
//   } catch (error) {
//     console.error(error)
//   }
// }
// window.addEventListener('storage', () => {
//   token.value = localStorage.getItem('token');
//   if (token.value) {
//     fetchUser();
//   } else {
//     username.value = '';
//   }
// });
const logout = () => {
  userStore.logout();
}

onMounted(()=>{
  userStore.fetchUser()
});
</script>

<template>
  <nav>
    <div class="nav flex flex-row items-center justify-between px-5 py-4">
    <RouterLink to="/" class="logo font-bold" >DetectiFy</RouterLink>
    <div v-if="userStore.user" class="flex flex-col items-center">
      <p>Welcome, <span class="name">{{ userStore.user.username }}</span> </p>
      <RouterLink to="/login" class="font-bold" @click="logout">Logout</RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/register">Register</RouterLink>

    </div>
  </div>
  </nav>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

 .logo{
  font-family: 'Pacifico', cursive;
   font-weight: bold;
   font-size: 1.5rem;
}

.name {
  font-family: 'Pacifico', cursive;
  font-weight: bold;
  font-size: 1.3rem;
}
.nav {
  box-shadow: 0 5px 20px #dadada;
}
</style>
