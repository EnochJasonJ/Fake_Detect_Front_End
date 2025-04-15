<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const urls = ref([])
const form = ref({ Product_URL: '' })
const errorMessage = ref('')
const token = localStorage.getItem('token')
console.log(token)
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
}
const fetchdata = async () => {
  try {
    const response = await axios.get('http://localhost:8000/scrape/', { headers })
    urls.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

const deleteData = async (pk) =>{
  try {
    await axios.delete(`http://localhost:8000/postURL/${pk}/delete/`,{headers});
    urls.value = urls.value.filter(url => url.id !== pk);
    await fetchdata();
  } catch (error) {
      console.error(error);
  }
}

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/postURL', form.value, { headers })
    await axios.post('http://localhost:8000/scrape/',form.value , { headers })
    console.log(form.value)
    await fetchdata()
    form.value.Product_URL = ''
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Enter a valid URL'
    form.value.Product_URL = ''
    console.error(error)
  }
}

onMounted(() => {
  fetchdata()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <form
      @submit.prevent="submitForm"
      class="flex flex-row gap-5 items-center justify-center mt-[150px] mb-10"
    >
      <div
        class="flex flex-row gap-5 items-center justify-center bg-white frm px-[70px] py-5 rounded-md"
      >
        <input
          v-model="form.Product_URL"
          type="text"
          placeholder="Enter URL"
          class="border-black border-b-2 placeholder:text-center px-3 py-2 outline-none"
        />
        <button type="submit" class="bttn bg-black text-white px-3 py-2 rounded-md">
          POST URL
        </button>
      </div>
    </form>
    <p v-if="errorMessage" class="text-red-500 text-center mb-5">
      {{ errorMessage }}
    </p>
    <div>
      <ul
        v-if="urls.length"
        class="list flex flex-col gap-5 bg-slate-800 mx-[250px] px-[40px] py-[50px] rounded-lg mb-[75px]"
      >
        <li v-for="(url, index) in urls" :key="index" class="crd bg-slate-900 px-[20px] py-2 rounded-md">
          <div class="flex flex-col items-center justify-center mb-10">
            <div class="flex flex-row justify-between items-center gap-10">
              <p class="text-slate-200 mt-5">{{ url.title }}</p>
              <button @click="deleteData(url.id)" class="bg-red-600 del text-white px-3 py-2 rounded-md">Delete</button>
            </div>
            <div class="mt-10">
              <img :src="url.image" alt="Image here" class="h-[200px] w-auto rounded-sm"/>
            </div>
            <div>
              <p  v-if="(url.sentiment)" class="text-slate-200 mt-5 text-5xl">{{ url.sentiment }}</p>
              <p v-else class="text-slate-200 mt-5 text-4xl">No Sentiment</p>
            </div>

          </div>
        </li>
      </ul>
      <div v-else class="bg-white px-5 py-10 rounded-md text-4xl text-gray-300 text-center">
        No URL Given
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  box-shadow: 5px 5px 15px rgb(40, 40, 40);
  transition: all 0.7s ease-in-out;
}
.list:hover {
  transform: scale(115%);
}

.bttn {
  transition: all 0.4s ease-in-out;
}
.bttn:hover {
  background-color: springgreen;
  color: black;
}

.del {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.del:hover {
  background-color: rgb(245, 91, 91);
}

.frm {
  box-shadow:
    5px 10px 15px rgb(211, 210, 210),
    -5px -5px 15px rgb(236, 236, 236);
}

.crd {
  box-shadow:
    0px -5px 10px rgb(128, 49, 232),    /* Top - Purple */
    5px 0px 10px rgb(0, 206, 89),    /* Right - Mint Green */
    0px 5px 10px rgb(197, 0, 0),        /* Bottom - Red */
    -5px 0px 10px rgb(255, 230, 132);     /* Left - Yellow */
}


</style>
