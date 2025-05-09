<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const router = useRouter()

const toast = useToast();

const form = ref({
  username: '',
  email: '',
  password: '',
})

const errorMessage = ref('');
const successMessage = ref('');

const handleSubmit = async () => {
  if(form.value.username != null || form.value.email != null || form.value.password != null){
    try {
      const response = await axios.post('https://fakedetectbackend-production.up.railway.app/register',form.value)
      toast.success("Registered successfully")
      console.log(response.data);
      successMessage.value = "Registration successful";
      setTimeout(() =>{
        successMessage.value=''
        form.value.username=''
        form.value.email=''
        form.value.password=''
      },2000)
      router.push('/login');

    }
    catch(error){
      console.error(error);
      toast.error("Registration Failed")
      errorMessage.value = "Registration Failed!";
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-[200px]">
    <form @submit.prevent="handleSubmit" class="flex flex-col rounded-lg  bg-white shadow-xl hover:shadow-2xl shadow-purple-300 hover:shadow-purple-500 transition-all duration-700 ease-in-out p-5" autocomplete="off">
      <input v-model="form.username" type="text" name="username" id="username" placeholder="User Name" class="placeholder:text-center mb-5 border-b-2 border-black px-20 py-2 outline-none" />
      <input v-model="form.email" type="email" name="email" id="email" placeholder="E-Mail" class="placeholder:text-center mb-5 border-b-2 border-black px-20 py-2 outline-none" />
      <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"  class="placeholder:text-center mb-5 border-b-2 border-black px-20 py-2 outline-none"/>
      <button type="submit" class="text-white bg-black py-3 rounded-md">Register</button>
      <div class="flex flex-row items-center justify-center gap-2 mt-2">
        <p>Already a User? </p>
        <RouterLink to="/login" class="text-blue-500">Login</RouterLink>
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
