<script setup>
import { ref } from "vue";
import tr from "@/lang/tr-TR";
import en from "@/lang/en-EN";

const cookie = useCookie('connect.sid')

//Giriş Kontrol
const inlog=ref(false)
try {
  if(cookie.value.key) inlog.value=true
} catch (error) {}

try {
  if(!cookie.value){
    cookie.value={language:'TR',currency:'TL'}
  }
} catch (error) {}



//Ayrı Bileşenler
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

const lang=ref()
const prime_curr=ref('')
const prime_lang=ref([])

async function update() {
  if(cookie.value.currency=='TL') prime_curr.value='₺$€'
  if(cookie.value.currency=='USD') prime_curr.value='$€₺'
  if(cookie.value.currency=='EURO') prime_curr.value='€$₺'
  if(cookie.value.language=='TR') {
    lang.value=tr
    prime_lang.value=['TR','EN']
  }
  if(cookie.value.language=='EN'){
    lang.value=en
    prime_lang.value=['EN','TR']
  } 
}
function changelan(lang){
  cookie.value.language = lang;
  cookie.value = JSON.parse(JSON.stringify(cookie.value));
  update()
}
function changecur(curr){
  if(curr == '₺'){
    cookie.value.currency = 'TL';
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
  }
  if(curr == '$'){
    cookie.value.currency = 'USD';
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
  }
  if(curr == '€'){
    cookie.value.currency = 'EURO';
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
  }
  update()
}
update()
</script>

<template>
  <div>
    <div class="z-20 w-full h-32 flex flex-nowrap justify-between items-center px-12 bg-black-main fixed border-b-4 border-orange-main">
      <NuxtLink to="/" class="text-orange-main hover:text-orange-400">
        <h1 class="font-black text-4xl font-sans"><span class="text-white">IS</span><span class="text-3xl transition-all">Tablo</span></h1>
      </NuxtLink>
      <ul class="flex flex-row flex-nowrap text-white-main font-bold items-center">
        <li class="mx-2"><NuxtLink to="/" class="text-white-main hover:text-orange-main">{{lang.mnmenu}}</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/urunler" class="text-white-main hover:text-orange-main">{{ lang.urnl }}</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/" class="text-white-main hover:text-orange-main">{{ lang.ilts }}</NuxtLink></li>
        <li class="mx-2"><NuxtLink to="/sepet" class="text-white-main hover:text-orange-main">{{ lang.sptm }}</NuxtLink></li>
        <li class="mx-2 border-l border-white-main pl-5" @mouseleave="isOpenT = false">
            <a href="javascript:window.location.href=window.location.href" class="text-white-main my-2 hover:text-orange-main" @mouseover="toggleT" @click="changecur(prime_curr[0])">{{prime_curr[0]}}</a>
          <div v-show="isOpenT" class="absolute w-3 h-auto" @mouseleave="toggleT">
            <a href="javascript:window.location.href=window.location.href" class="text-gray-main my-2 hover:text-orange-main" @click="changecur(prime_curr[1])">{{prime_curr[1]}}</a>
            <a href="javascript:window.location.href=window.location.href" class="text-gray-main my-2 hover:text-orange-main" @click="changecur(prime_curr[2])">{{prime_curr[2]}}</a>
          </div>
        </li>
        <li class="ml-5 py-1 px-2 shadow-sm" @mouseleave="isOpen = false">
          <a href="javascript:window.location.href=window.location.href" class="text-white-main hover:text-orange-main" @mouseover="toggle" @click="changelan(prime_lang[0])">{{prime_lang[0]}}</a>
          <div v-show="isOpen" class="absolute w-6 h-auto" @mouseleave="toggle">
            <a href="javascript:window.location.href=window.location.href" class="text-gray-main my-2 hover:text-orange-main" @click="changelan(prime_lang[1])">{{prime_lang[1]}}</a>
          </div>
        </li>
        <li class="ml-7 mr-2" v-if="inlog"><NuxtLink to="/hesabim" class="text-white-main pb-1 transition-all hover:text-orange-main">{{lang.hsbm}}</NuxtLink></li>
        <li class="ml-7 mr-2" v-if="!inlog"><NuxtLink to="/giris" class="text-white-main pb-1 transition-all hover:text-orange-main">{{lang.grsyp}}</NuxtLink></li>
      </ul>
    </div> 
  </div>
</template>

<style>
.shadow-make{
  box-shadow:
  2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
  41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
  100px 100px 80px rgba(0, 0, 0, 0.15);
}
</style>