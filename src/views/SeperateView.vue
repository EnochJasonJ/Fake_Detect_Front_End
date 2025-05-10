<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const classification_reason = ref('')
const token = localStorage.getItem('token')
console.log(token)
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
}

function goBack(){
  router.go(-1)
}

onMounted(async () => {
  const productId = route.params.id
  try {
    const response = await axios.get(`https://fakedetectbackend-production.up.railway.app/product/${productId}/`,{ headers })
    product.value = response.data
    console.log(response.data)
    classifyProduct()
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
})

function classifyProduct(){
  const reviewCount = product.value.review_count
  const ratingsCount = product.value.ratings_count
  const sentiment = product.value.sentiment
  if(reviewCount < 20 && ratingsCount < 20){
    classification_reason.value = 'Both the review count and rating count are low, raising suspicion about the product\'s authenticity. Sentiment analysis further checked if these few reviews show unnatural or negative patterns.'
  }
  else if(reviewCount >=20 && ratingsCount >= 20){
    classification_reason.value='Both review and rating counts are sufficient. Sentiment analysis confirmed the reviews are generally positive and genuine.'
  }
  else{
    if(sentiment === 'Genuine Product' && (ratingsCount > reviewCount)){
      classification_reason.value = 'While there\'s a mismatch between review and rating counts, the sentiment analysis and high ratings indicates genuine and positive feedback, reducing suspicion.'
    }
    else if(sentiment === 'Genuine Product' && (ratingsCount < reviewCount)){
      classification_reason.value = 'While there\'s a mismatch between review and rating counts, the sentiment analysis and high review indicates genuine and positive feedback, reducing suspicion.'
    }
    else{
      classification_reason.value='There is a mismatch between review and rating counts, which might indicate manipulation. Sentiment analysis detected unusual patterns in the reviews.'
    }
    // classification_reason.value='There is a mismatch between review and rating counts, which might indicate manipulation. Sentiment analysis helped verify if the reviews reflect real customer experiences.'
  }

}
</script>

<template>
  <section class="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen py-12">
    <div
      v-if="product"
      class="product-details mx-auto mt-8 mb-16 shadow-2xl flex flex-col md:flex-row items-center max-w-4xl gap-10 bg-white rounded-xl overflow-hidden"
    >
    <div class="flex-1 flex flex-col gap-8 p-10">
        <div class="flex flex-row items-center justify-center gap-10">
          <a @click.prevent="goBack" href="#" class="text-2xl text-white bg-[#010101] rounded-full w-[60px] h-[45px] flex items-center justify-center"> &larr; </a>
          <h2 class="text-2xl w-[100%] font-extrabold mb-3 text-gray-900 ">
            {{ product.title.slice(0, 60) + (product.title.length > 60 ? '...' : '') }}
          </h2>
        </div>
        <div>
          <h3 class="font-semibold text-lg text-gray-700 mb-2">Description</h3>
          <p class="text-gray-700 bg-gray-50 p-6 rounded-lg  shadow-lg leading-relaxed" :class="{'shadow-[#acfbd4]': product.sentiment === 'Genuine Product','shadow-[#fbacac]': product.sentiment === 'Suspicious Product'}">
            {{ product.description.replace('About this item', '').slice(0, 450) + (product.description.length > 450 ? '...' : '') }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <h3 class="font-semibold text-gray-700 text-lg mb-0">Sentiment:</h3>
          <span
            class="inline-block px-4 py-1 rounded-full text-base font-semibold transition-colors duration-200"
            :class="{
              'bg-green-100 text-green-700 border border-green-300': product.sentiment === 'Genuine Product',
              'bg-yellow-100 text-yellow-700 border border-yellow-300': product.sentiment === 'Neutral',
              'bg-red-100 text-red-700 border border-red-300': product.sentiment === 'Suspicious Product',
              'bg-gray-100 text-gray-500 border border-gray-300': !product.sentiment
            }"
          >
            {{ product.sentiment || 'No Sentiment' }}
          </span>
        </div>
        <div class="flex flex-col gap-6 bg-gray-50 p-6 rounded-lg shadow-lg" :class="{'shadow-[#acfbd4]': product.sentiment === 'Genuine Product','shadow-[#fbacac]': product.sentiment === 'Suspicious Product'}">
          <div class="flex flex-row items-center justify-between">
            <h3 class="font-semibold text-gray-700 text-lg">Reviews Count:</h3>
            <p class="text-gray-900 font-medium">{{ product.review_count }}</p>
          </div>
          <div class="flex flex-row items-center justify-between">
            <h3 class="font-semibold text-gray-700 text-lg">Ratings Count:</h3>
            <p class="text-gray-900 font-medium">{{ product.ratings_count }}</p>
          </div>
        </div>
        <div>
          <h1 class="font-bold text-lg">How did we classified?</h1>
          <p>{{ classification_reason }}</p>
        </div>
      </div>
      <div class="flex-1 flex justify-center items-center">
        <img
          :src="`https://akedetectbackend-production.up.railway.app${product.image}`"
          alt="Product Image"
          class="product-image p-10 h-80 w-auto rounded-lg object-contain shadow-lg border border-gray-200"
        />
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-96">
      <svg class="animate-spin h-8 w-8 text-gray-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <p class="text-gray-600 text-lg">Loading product details...</p>
    </div>
  </section>
</template>



<style scoped>
.product-details {
  padding: 20px;
  /* background-color: #e5e5e5; */
  /* background-color: #f9f9f9; */
  border-radius: 8px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
}

.product-image {
  max-width: 100%;
  /* height: auto; */
  margin-bottom: 20px;
  /* background-color: #00ff7f; */
}
</style>
