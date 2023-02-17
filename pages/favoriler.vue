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
const urun=ref(0)

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: '{"token":"'+cookie.value.key+'"}'
};

res.value = await fetch(urlbase+'/api/store/basket/favorite', options)
  .then(response => response.json())
  .then(response => response.message)
  .catch(err => console.error(err));


  const removeitem = (async (id)=>{
    if(req.value!=null){
      const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"id":"'+id+'","token":"'+cookie.value.key+'"}'
    };

    await fetch(urlbase+'/api/store/basket/delfavorite', options)
      .then(response => response.json())
      .then(response => {if(response.status==200){
        document.getElementById(id).style.display='none'}
      })
      .catch(err => console.error(err));
    }
  })
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-screen bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap justify-center">
        <div class="w-2/4 h-auto mt-5">
          <h1 v-if="!res[0]" class="font-bold text-gray-200 text-2xl text-center my-6">Favori Bir Ürünün Yok ! <a href="/urunler" class="text-orange-main">Göz At <i class="bx bx-link"></i> </a></h1>
            <!-- Sepet Ürün Elementi -->
            <div v-if="req" v-for="sepet in res" class="w-2/3 h-20 bg-gray-200 rounded my-3 flex flex-nowrap m-auto" :id="sepet[0].item.tabloid">
              <!-- Sepet Yan 1. Kısım -->
              <div class="w-5/6 h-16 flex flex-nowrap mt-2 text-black-main items-center">
                <img :src="urlbase+'/images/'+sepet[0].item.images[0].split(',')[0]" class="h-full p-1 rounded-lg w-16">
                <div class="w-auto h-full bg-slate-400"></div>
                <div class="flex flex-col">
                  <p class="w-full h-6 overflow-hidden text-black-main"><a :href="'/urunler/id/'+sepet[0].item.tabloid">{{ sepet[0].item.title }}</a> <span class="text-gray-primary text-xs overflow-hidden"> {{ sepet[0].item.explanation }} </span></p>
                  <p class="text-xs mt-1 text-gray-primary">Tahmini Kargo Teslim: 5 gün sonra</p>
                </div>
              </div>
              <!-- Sepet Yan 2. Kısım -->
              <div class="w-1/6 h-auto flex flex-nowrap items-center justify-between pr-5">
                <p class="text-yellow-600">{{convertcurr(sepet[0].item.price)}}</p>
                <a href="/" onclick="return false" @click="removeitem(sepet[0].item.tabloid)" class="bx bx-x text-red-700 hover:text-red-500 text-xl"></a>
              </div>
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