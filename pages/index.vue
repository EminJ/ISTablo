<script setup>
  import Navbar from "./Navbar.vue";
</script>
<template>
  <div>
    <div class="w-full h-screen bg-gray-background block text-white">
      <Navbar/>
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
        <div class="w-1/2 h-full flex justify-center items-start">
          <div class="w-4/5 h-auto m-5 rounded-lg p-4 bg-gray-primary shadow-lg shadow-black">
            <div class="p-10">
              <p class="font- text-5xl font-black text-white pb-10">ISTablo, Giriş Yap</p>
            <p class=" font-extralight text-gray-400 pb-10 w-4/5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, quis quaerat amet ad saepe id earum? Quod, sint ducimus vero earum deleniti nesciunt aspernatur in enim fugiat, esse qui nam?
            </p>
            <input type="text" placeholder="E-Posta Adresi Girişi" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2 mr-5 mb-5"/>
            <input type="password" placeholder="Şifre Girişi" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2"/><br>
            <input type="button" value="Giriş Yap" class="w-32 py-2 px-3 bg-slate-600 rounded-sm transition-all hover:bg-gray-800 my-5">
            <span class="mx-5">Hesabın Yok mu? <a href="/" class="text-orange-main font-bold">Kayıt Ol</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>