<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'
import { useUserStore } from '../../store/user.js'
const toast = useToast();

const userStore = useUserStore();
const form = ref({
  username: '',
  password: '',
})

const router = useRouter();

const errorMessage = ref('');
const successMessage = ref('');

const handleSubmit = async () => {
  if(form.value.username != null || form.value.password != null){
    try {
      const response = await axios.post('https://fakedetectbackend-production.up.railway.app/login',form.value)
      toast.success("Login successfully")
      console.log(response.data);
      successMessage.value = "Login successful";
      localStorage.setItem('token',response.data.token);
      userStore.SetToken(response.data.token);
      setTimeout(() =>{
        successMessage.value=''
        form.value.username=''
        form.value.password=''
      },2000)
      router.push('/checkStatus');

    }
    catch(error){
      console.error(error);
      toast.error("Login Failed")
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-[200px]">
    <form @submit.prevent="handleSubmit" class="flex flex-col rounded-lg shadow-xl hover:shadow-2xl shadow-purple-300 hover:shadow-purple-500 transition-all duration-700 ease-in-out bg-white form p-5" autocomplete="off">
      <input v-model="form.username" type="text" name="username" id="username" placeholder="User Name" class="placeholder:text-center mb-5 border-b-2 border-black px-20 py-2 outline-none" />
      <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"  class="placeholder:text-center mb-5 border-b-2 border-black px-20 py-2 outline-none"/>
      <button type="submit" class="text-white bg-black py-3 rounded-md">Login</button>
      <div class="flex flex-row items-center justify-center gap-2 mt-2">
        <p>New User? </p>
        <RouterLink to="/register" class="text-blue-500">Register</RouterLink>
      </div>
      <p v-if="errorMessage" class="text-center my-3 text-red-500">{{errorMessage}}</p>
      <p v-if="successMessage" class="text-center my-3 text-green-500">{{successMessage}}</p>
    </form>
  </div>
</template>

<style scoped>

input{
  text-align: center;
}
</style>
