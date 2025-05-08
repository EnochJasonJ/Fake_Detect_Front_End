<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)
const token = localStorage.getItem('token')
console.log(token)
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
}
onMounted(async () => {
  const productId = route.params.id
  try {
    const response = await axios.get(`http://localhost:8000/product/${productId}/`,{ headers })
    product.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
})
</script>

<template>
  <div v-if="product" class="product-details mx-10 mt-10 mb-[100px] shadow-gray-400 shadow-lg">
    <div class="flex flex-col items-start justify-center gap-5">
      <div class="flex flex-row items-center justify-center gap-5">
        <h2><strong>Title:</strong></h2>
        <h2 class="my-10">{{ product.title }}</h2>
      </div>
      <div class="flex flex-row items-center justify-center gap-5">
        <h1><strong>Description: </strong></h1>
        <p>{{ product.description.replace('About this item','').slice(0,450)+'...' }}</p>
      </div>
      <div class="flex flex-row items-center justify-center gap-5">
        <h1><strong>Sentiment:</strong> </h1>
        <p>{{ product.sentiment || 'No Sentiment' }}</p>
      </div>
    </div>
    <img :src="`http://localhost:8000${product.image}`" alt="Product Image" class="product-image h-[400px] rounded-md shadow-gray-600 shadow-lg " />

  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>



<style scoped>
.product-details {
  padding: 20px;
  background-color: #e5e5e5;
  /* background-color: #f9f9f9; */
  border-radius: 8px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
}

.product-image {
  max-width: 100%;
  /* height: auto; */
  margin-bottom: 20px;
}
</style>
