<script setup>
import { ref } from "vue";
let isOpen = ref(false)
let isOpenT = ref(false)
const toggle = (() => {
  isOpenT.value = false
  isOpen.value = !isOpen.value
})
const toggleT = (() => {
  isOpen.value = false
  isOpenT.value = !isOpenT.value
})

</script>

<template>
  <div>
    <div class="w-full h-32 flex flex-nowrap justify-between items-center px-12 bg-black-main fixed z-10">
      <NuxtLink to="/" class="text-orange-main hover:text-orange-400">
        <h1 class="font-black text-4xl font-sans"><span class="text-white">IS</span><span class="text-3xl transition-all">Tablo</span></h1>
      </NuxtLink>
      <ul class="flex flex-row flex-nowrap text-white-main font-bold items-center">
        <li class="mx-2"><NuxtLink to="/" class="text-white-main hover:text-orange-main">Ana Sayfa</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/items" class="text-white-main hover:text-orange-main">Ürünlerimiz</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/" class="text-white-main hover:text-orange-main">İletişim</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/" class="text-white-main hover:text-orange-main">Sepetim</NuxtLink></li>
        <li class="mx-2 border-l border-white-main pl-5" @mouseleave="isOpenT = false">
          <NuxtLink to="/" class="text-white-main hover:text-orange-main" @mouseover="toggleT">₺</NuxtLink>
          <div v-show="isOpenT" class="absolute w-3 h-auto" @mouseleave="toggleT">
            <NuxtLink to="/" class="text-gray-main my-2">€</NuxtLink>
            <NuxtLink to="/" class="text-gray-main my-2">$</NuxtLink>
          </div>
        </li>
        <li class="ml-5 py-1 px-2 shadow-sm" @mouseleave="isOpen = false">
          <NuxtLink to="/" class="text-white-main hover:text-orange-main" @mouseover="toggle">TR</NuxtLink>
          <div v-show="isOpen" class="absolute w-6 h-auto" @mouseleave="toggle">
            <NuxtLink to="/" class="text-gray-main my-2">EN</NuxtLink>
          </div>
        </li>
        <li class="ml-7 mr-2"><NuxtLink to="/login"
            class="text-white-main pb-1 transition-all hover:text-orange-main">Giriş Yap / Kayıt Ol</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>