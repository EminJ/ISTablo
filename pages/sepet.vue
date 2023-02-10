<script setup>
  import NuxtLayout from '@/layout/default.vue'
  
  import { ref } from "vue";
  import tr from "@/lang/tr-TR";
  import en from "@/lang/en-EN";
  const cookie=useCookie('connect.sid')
  const urlbase = 'http://localhost:1000'
  try {
    if(!cookie.value){
      cookie.value={language:'TR',currency:'TL'}
    }
  } catch (error) {}
  
  const lang = ref()
  try {
      if(cookie.value.language=='TR') lang.value=tr
      if(cookie.value.language=='EN') lang.value=en
  } catch (error) {
      lang.value=tr
  }
  
  const curr = ref()
  try {
      if(cookie.value.currency=='TL') curr.value=-1
      if(cookie.value.currency=='USD') curr.value=0
      if(cookie.value.currency=='EURO') curr.value=3
  } catch (error) {
      curr.value=-1
  }
  
  const { data, pending, error, refresh } = await useFetch('http://hasanadiguzel.com.tr/api/kurgetir')
  const veri=data._rawValue.TCMB_AnlikKurBilgileri
  function convertcurr(price){
      if(curr.value == -1) return '₺'+price.toFixed(2);
      if(curr.value == 0) return '$'+(price/veri[curr.value].ForexSelling).toFixed(2);
      if(curr.value == 3) return '€'+(price/veri[curr.value].ForexSelling).toFixed(2);
  }
  //{{convertcurr(125)}}

  const req = ref()
try {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"token":"'+cookie.value.key+'"}'
  };
  req.value = await fetch(urlbase+'/api/auth/usertested',options)
  .then(async (req)=> {
    let text = await req.text()
    return JSON.parse(text).message.user})
  if(!req.value){
    cookie.value.key = undefined;
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
  } 
} catch (error) {
  cookie.value.key = undefined;
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
}
//req.value==null = giriş yapılmamış.

if(!req.value){
  console.log('localstorage');
}
else{
  console.log();
}

</script>

<template>
  <NuxtLayout>
    <div class="w-full h-auto bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap justify-center">
        <div class="w-2/4 h-auto mt-5">
          <div v-if="req" v-for="sepet in req.sepet">
            <!-- Sepet Ürün Elementi -->
            <div class="w-full h-20 bg-gray-200 rounded my-3 flex flex-nowrap">
              <!-- Sepet Yan 1. Kısım -->
              <div class="w-3/4 h-20 flex flex-nowrap text-black-main items-center">
                <img src="/images/items/Elegant-Flower-Head-Art.webp" class="h-full p-1 rounded-lg">
                <div class="w-auto h-full bg-slate-400"></div>
                <div class="flex flex-col">
                  <p class="w-full h-6 overflow-hidden text-black-main">Tablo Adı <span class="text-gray-primary text-xs overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam exercitationem voluptatem dolor perspiciatis ducimus, voluptatibus nisi quibusdam corrupti tempore rerum vitae architecto et impedit eum, laudantium, labore fugit cum iste.</span></p>
                  <p class="text-xs text-gray-primary">Boyut/Ebat {{sepet.size}}, Tablo Rengi {{sepet.color}}</p>
                  <p class="text-xs mt-1 text-gray-primary">Tahmini Kargo Teslim: 5 gün sonra</p>
                </div>
              </div>
              <!-- Sepet Yan 2. Kısım -->
              <div class="w-1/4 h-auto flex flex-nowrap items-center justify-between pr-5">
                <div class="w-24 h-10 flex flex-nowrap border border-gray-300 rounded text-black-main justify-center items-center">
                  <div class="w-6 h-9 flex bg-slate-300 bg-opacity-50 text-gray-500 rounded-l justify-center items-center">-</div>
                  <div class="w-12 h-9 flex justify-center items-center text-black-main">1</div>
                  <div class="w-6 h-9 flex bg-slate-300 bg-opacity-50 text-black-main rounded-r justify-center items-center">+</div>
                </div>
                <p class="text-yellow-600">300,00 TL</p>
                <p class="bx bx-trash text-black-main text-base"></p>
              </div>
            </div>
          </div>
          <hr class="my-5 border-gray-500">
          <div class="w-full h-14 mb-3 flex flex-nowrap justify-between items-center">
            <div class="flex flex-nowrap items-center">
              <div class="py-1 px-2 bg-yellow-700 text-gray-200 text-xs font-bold rounded-full mr-2">Kargo Toplam 19,99 TL</div>
              <!-- <div class="py-1 px-2 bg-yellow-700 text-gray-200 text-xs font-bold rounded-full mr-2"><del>Kargo Toplam 19,99 TL</del></div>-->
              <p class="text-yellow-500 font-bold">319.99 TL</p>
            </div>
            <a href="/" onclick="return false" class="text-xl font-serif mx-6 border border-orange-main px-5 py-2 text-white-main rounded hover:bg-orange-main hover:text-black-main transition-all">Sepeti Onayla</a>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>