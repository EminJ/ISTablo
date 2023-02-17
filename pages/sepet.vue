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

const res = ref()
const toplam=ref(0)
const urun=ref(0)

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: '{"token":"'+cookie.value.key+'"}'
};

res.value = await fetch(urlbase+'/api/store/basket/show', options)
  .then(response => response.json())
  .then(response => {
    for (let i = 0; i < response.message.length; i++) {
      const element = response.message[i];
      toplam.value+=element[0].item.price
    }
    if(toplam.value<100)toplam.value+=19
    return response.message
  })
  .catch(err => console.error(err));

  const removeitem = (async (sepet,urun)=>{
    if(req.value!=null){
      const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"id":"'+sepet[0].item.tabloid+'","size":"'+sepet[1].settings.size+'","color":"'+sepet[1].settings.color+'","token":"'+cookie.value.key+'"}'
    };

    await fetch(urlbase+'/api/store/basket/remove-from-cart', options)
      .then(response => response.json())
      .then(response => {if(response.status==200){

        let productIndex = -1
        for (let i = 0; i < res.value.length; i++) {
            const element = res.value[i];
            if(element[0].item.tabloid==sepet[0].item.tabloid && element[1].settings.size == sepet[1].settings.size && element[1].settings.color == sepet[1].settings.color) productIndex=i
        }
        res.value.splice(productIndex, 1);
        toplam.value-=sepet[0].item.price
        document.getElementById(sepet[0].item.tabloid+sepet[1].settings.size+sepet[1].settings.color+urun).style.display='none'}
        console.log(res.value);
      })
      .catch(err => console.error(err));
    }
  })

console.log(res.value);
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-screen bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap justify-center">
        <div class="w-2/4 h-auto mt-5">
          <h1 v-if="toplam<=19" class="font-bold text-gray-200 text-2xl text-center my-6">Ürün Bulunamadı ! <a href="/urunler" class="text-orange-main">Göz At <i class="bx bx-link"></i> </a></h1>
            <!-- Sepet Ürün Elementi -->
            <div v-if="req" v-for="sepet in res" class="w-full h-20 bg-gray-200 rounded my-3 flex flex-nowrap" :id="sepet[0].item.tabloid+sepet[1].settings.size+sepet[1].settings.color+urun++">
              <!-- Sepet Yan 1. Kısım -->
              <div class="w-3/4 h-20 flex flex-nowrap text-black-main items-center">
                <img :src="urlbase+'/images/'+sepet[0].item.images[0].split(',')[0]" class="h-full p-1 rounded-lg w-20">
                <div class="w-auto h-full bg-slate-400"></div>
                <div class="flex flex-col">
                  <p class="w-full h-6 overflow-hidden text-black-main"><a :href="'/urunler/id/'+sepet[0].item.tabloid">{{ sepet[0].item.title }}</a> <span class="text-gray-primary text-xs overflow-hidden"> {{ sepet[0].item.explanation }} </span></p>
                  <div class="text-xs text-gray-primary flex">Boyut/Ebat {{ sepet[1].settings.size }}, Tablo Rengi <div class="w-4 h-4 rounded-full mx-2" :style="{backgroundColor:sepet[1].settings.color}"></div></div>
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
                <p class="text-yellow-600">{{convertcurr(sepet[0].item.price)}}</p>
                <a href="/" onclick="return false" @click="removeitem(sepet,urun)" class="bx bx-trash text-black-main text-base"></a>
              </div>
            </div>
          <hr class="my-5 border-gray-500">
          <div v-if="toplam>19" class="w-full h-14 mb-3 flex flex-nowrap justify-between items-center">
            <div class="flex flex-nowrap items-center">
              <div v-if="toplam<100" class="py-1 px-2 bg-yellow-700 text-gray-200 text-xs font-bold rounded-full mr-2">Kargo Toplam {{ convertcurr(19) }}</div>
              <div v-show="toplam>=100" class="py-1 px-2 bg-yellow-700 text-gray-200 text-xs font-bold rounded-full mr-2"><del>Kargo Toplam {{ convertcurr(19) }}</del></div>
              <p class="text-yellow-500 font-bold">{{convertcurr(toplam)}}</p>
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