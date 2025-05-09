<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { nextTick } from 'vue'
let scroll
// import { useMotion } from '@vueuse/motion'

// /results
//767

const urls = ref([])
// let lastScrollTop = 0;
// window.addEventListener('scroll', () => {
//     let st = window.scrollY || document.documentElement.scrollTop;
//     window.scrollTo({
//       top: lastScrollTop + (st - lastScrollTop) * 0.1, // 0.1 means 10% move
//       behavior: 'auto',
//     });
//     lastScrollTop += (st - lastScrollTop) * 0.1;
//   });
const form = ref({ Product_URL: '' })
const errorMessage = ref('')
const token = localStorage.getItem('token')
const toast = useToast()
console.log(token)
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
}
const fetchdata = async () => {
  try {
    const response = await axios.get('https://fakedetectbackend-production.up.railway.app/scrape/', { headers })
    urls.value = response.data
    console.log(response.data)
    await nextTick()
    if (scroll) scroll.update()
  } catch (error) {
    console.error(error)
  }
}

const deleteData = async (pk) => {
  try {
    await axios.delete(`https://fakedetectbackend-production.up.railway.app/postURL/${pk}/delete/`, { headers })
    toast.success('Product deleted successfully.')
    urls.value = urls.value.filter((url) => url.id !== pk)
    await fetchdata()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    await axios.post('https://fakedetectbackend-production.up.railway.app/postURL', form.value, { headers })
    toast.success('It may take a while to fetch. Please stay calm!')
    await axios.post('https://fakedetectbackend-production.up.railway.app/scrape/', form.value, { headers })
    console.log(form.value)
    await fetchdata()
    scroll.update()
    form.value.Product_URL = ''
    errorMessage.value = ''
  } catch (error) {
    // errorMessage.value = 'Enter a valid URL'
    toast.error('Enter a valid URL!')
    form.value.Product_URL = ''
    console.error(error)
  }
}

onMounted(() => {
  fetchdata().then(() => {
    scroll = new LocomotiveScroll({
      el: document.querySelector('#main-container'),
      smooth: true,
      multiplier: 0.5,
    })
  })
})

onBeforeUnmount(()=>{
  if (scroll) {
    scroll.destroy()
  }
})
</script>

<template>
  <div id="main-container" class="pb-[100px]" data-scroll-container>
    <section data-scroll-section class="flex flex-col items-center justify-center">
      <form
        @submit.prevent="submitForm"
        class="flex flex-row gap-5 items-center justify-center mt-[150px] mb-10"
      >
        <div
          class="flex flex-row gap-5 items-center w-full max-w-[1024px] justify-center bg-white frm px-5 sm:px-10 md:px-20 lg:px-[70px] py-5 rounded-lg shadow-blue-300 hover:shadow-xl
          hover:shadow-blue-300 shadow-lg transition-all duration-700"
        >
          <input
            v-model="form.Product_URL"
            type="text"
            placeholder="Enter URL"
            class="border-gray-300 border-b-2 placeholder:text-center px-3 py-2 outline-none focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            class="bttn bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            POST URL
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mb-5 text-lg font-semibold">
        {{ errorMessage }}
      </p>

      <div
        v-if="urls.length"
        class="flex flex-col gap-8 items-center pb-[500px] bg-gray-100 p-10 rounded-lg shadow-lg"
      >
        <div
          v-motion-slide-visible-right
          initial="{ opacity: 0,x:20, y: 50 }"
          :delay="300"
          :duration="1500"
          :easing="'ease-in-out'"
          v-for="(url, index) in urls"
          :key="index"
          class="crd bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all w-[90%] md:w-[70%] lg:w-[50%]"
          data-scroll
          :data-scroll-speed="index%2===0 ? 3.5 : 6"
        >
          <div class="flex flex-col items-center">
            <img
            :src="url.image"
            alt="Image here"
            class="h-[200px] w-auto rounded-md mb-5" />
            <p class="text-gray-800 text-lg font-semibold mb-3">{{ url.title }}</p>
            <p v-if="url.sentiment" class="text-xl font-bold mb-3"
            :class="{
              'bg-green-100 text-green-600 px-5 py-1 rounded-md':url.sentiment === 'Genuine Product',
              'bg-red-100 text-red-600 px-5 py-1 rounded-md':url.sentiment === 'Suspicious Product',
              }">
              {{ url.sentiment }}
            </p>
            <p v-else class="text-gray-500 text-lg mb-3">No Sentiment</p>
            <div class="flex flex-col md:flex-row gap-3 items-center justify-center w-full">
              <button
                @click="deleteData(url.id)"
                class="del bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <router-link
                :to="`/results/${url.id}/`"
                class="bg-gradient-to-r p-3 rounded-lg text-white from-blue-500 to-purple-500 hover:text-blue-300 transition-all duration-[750ms]"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-gray-200 px-10 py-20 rounded-lg text-2xl text-gray-500 text-center shadow-md"
      >
        No URL Given
      </div>
    </section>
  </div>
</template>

<style scoped>
.list {
  box-shadow: 5px 5px 15px rgb(40, 40, 40);
  transition: all 0.7s ease-in-out;
}
.list:hover {
  transform: scale(105%);
}

.bttn {
  transition: all 0.4s ease-in-out;
}
.bttn:hover {
  background-color: springgreen;
  color: rgb(233, 255, 255);
  font-weight: bold;
}

.del {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.del:hover {
  background-color: rgb(245, 91, 91);
}

/* .frm {
  box-shadow:
    5px 10px 15px rgb(211, 210, 210),
    -5px -5px 15px rgb(236, 236, 236);
} */

.crd {
  box-shadow: 0px 3px 10px rgb(49, 171, 232); /* Left - Yellow */
  /* 0px 5px 10px rgb(128, 49, 232); Left - Yellow */
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.crd:hover {
  transform: scale(1.03);
  box-shadow: 0px 5px 20px rgb(49, 171, 232);
}
input {
  transition: width 0.5s ease-in-out, border-color 0.3s ease-in-out;
  width: 200px;
}
input:focus {
  width: 240px;
  border-color: #3b82f6; /* Tailwind's blue-500 */
  outline: none;
}
</style>

<style>
html, body {
  height: 100%;
  overflow-x: hidden; /* Only prevent horizontal scroll */
  overflow-y: auto;
}

[data-scroll-container] {
  min-height: 100vh;
  will-change: transform;
}

[data-scroll-section] {
  position: relative;
}

</style>

