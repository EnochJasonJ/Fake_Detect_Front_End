<script setup>
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { useUserStore } from '../../store/user.js'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  console.log(userStore.user)
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  })

  userStore.fetchUser() // fetch user when the page loads
})
</script>

<template>
  <div class="bg-gray-50 text-gray-800" data-scroll-container>
    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-r from-purple-300 via-pink-300 to-red-300"
      data-scroll
      data-scroll-speed="1"
    >
      <img
        src="https://uploads-ssl.webflow.com/63e65b6bd4ce447658d6df5c/63e65b6bd4ce44fe88d6dfb2_bg-gradient-mesh.svg"
        alt="Mesh Background"
        class="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        data-scroll
        data-scroll-speed="-2"
      />
      <div class="relative z-10 max-w-2xl mx-auto px-5">
        <h1
          class="text-6xl font-extrabold mb-5 text-[#141414] drop-shadow-5xl animate-fade-in"
          data-scroll
          data-scroll-speed="2"
        >
          Detect Fake Products Instantly
        </h1>
        <p
          class="text-xl mb-8 text-pink-600 drop-shadow-md animate-fade-in"
          data-scroll
          data-scroll-speed="1"
        >
          Our AI-powered tool ensures your purchases are 100% genuine. Avoid scams. Shop with
          confidence.
        </p>

        <!-- If NOT signed in, show Get Started -->
        <router-link v-if="!userStore.user" to="/login">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition animate-bounce"
          >
            Get Started
          </button>
        </router-link>

        <!-- If signed in, show Check Status -->
        <router-link v-else to="/checkStatus">
          <button
            class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition animate-bounce"
          >
            Check Status
          </button>
        </router-link>
      </div>
    </section>

    <!-- Features Section - Always visible -->
    <section class="py-20 px-5 max-w-6xl mx-auto" data-scroll>
      <h2
        class="text-4xl font-bold text-center mb-12 animate-slide-up"
        data-scroll
        data-scroll-speed="1"
      >
        Why Choose Us?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          class="bg-white p-8 rounded-2xl shadow-blue-300 shadow-lg hover:scale-105 transform transition animate-fade-in"
          data-scroll
          data-scroll-speed="1"
        >
          <div
            class="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-5 mx-auto"
          >
            <i class="fas fa-shield-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center">Authenticity Guaranteed</h3>
          <p class="text-gray-600 text-center">
            Our system cross-checks products from trusted sources to ensure authenticity.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-green-300 shadow-lg hover:scale-105 transform transition animate-fade-in"
          data-scroll
          data-scroll-speed="1"
        >
          <div
            class="bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mb-5 mx-auto"
          >
            <i class="fas fa-brain text-2xl text-green-600"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center">AI Powered</h3>
          <p class="text-gray-600 text-center">
            Leveraging advanced machine learning models to detect counterfeit products instantly.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-purple-300 shadow-lg hover:scale-105 transform transition animate-fade-in"
          data-scroll
          data-scroll-speed="1"
        >
          <div
            class="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mb-5 mx-auto"
          >
            <i class="fas fa-bolt text-2xl text-purple-600"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center">Fast & Reliable</h3>
          <p class="text-gray-600 text-center">
            Get instant results with high accuracy and minimal wait time.
          </p>
        </div>
      </div>
    </section>

    <!-- Call To Action -->
    <section
      class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-5"
      data-scroll
      data-scroll-speed="1"
    >
      <h2 class="text-4xl font-bold mb-5 animate-slide-up" data-scroll data-scroll-speed="2">
        Ready to verify your products?
      </h2>
      <p class="mb-8 text-lg animate-fade-in" data-scroll data-scroll-speed="1">
        Join thousands of users who trust our service daily!
      </p>

      <!-- If NOT signed in, show Sign In Now -->
      <router-link v-if="!userStore.user" to="/login">
        <button
          class="bg-white text-blue-700 px-8 py-3 rounded-full text-lg shadow-lg hover:bg-gray-100 transition animate-bounce"
        >
          Sign In Now
        </button>
      </router-link>

      <!-- If signed in, show Check Status -->
      <router-link v-else to="/checkStatus">
        <button
          class="bg-white text-green-700 px-8 py-3 rounded-full text-lg shadow-lg hover:bg-gray-100 transition animate-bounce"
        >
          Go to Check Status
        </button>
      </router-link>
    </section>

    <!-- Footer -->
    <footer class="py-5 text-center text-gray-500 text-sm" data-scroll data-scroll-speed="1">
      © 2025 OurProduct. All rights reserved.
    </footer>
  </div>
</template>


<style>
/* Parallax effect */
section.relative::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  z-index: 1;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-in-out;
}

.animate-bounce {
  animation: bounce 1.5s infinite;
}

/* .banner{
  background: linear-gradient(45deg, #4e54c8, #8fd9fb, #5337bf, #8f94fb);

  background-size: cover;
  background-position: center;
} */
</style>
