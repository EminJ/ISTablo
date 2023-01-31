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

const favorite=((id) => {
    if(!cookie.value.key){
        // Bir bildirim
        console.log('Hesap uyarısı !');
    }
})
</script>

<template>
    <NuxtLayout>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-full h-full pt-32">
                <!-- FİLTRE SİSTEMİ İÇİN <div class="w-full h-auto mt-6">
                    <a href="/" onclick="return false" class="mx-2">Önerilen sıralama</a>
                    <a href="/" onclick="return false" class="mx-2">En düşük fiyat</a>
                    <a href="/" onclick="return false" class="mx-2">En yüksek fiyat</a>
                    <a href="/" onclick="return false" class="mx-2">En çok satan</a>
                    <a href="/" onclick="return false" class="mx-2">En çok beğilenenler</a>
                </div>-->
                <div class="w-80 h-110 bg-black-main rounded-md mx-12 my-7 transition-all shadow-md hover:shadow-gray-900">
                    <div class="w-full h-80 bg-orange-100 rounded-t-md text-right" style="background: url('/images/items/Elegant-Flower-Head-Art.webp') no-repeat; background-size: contain;">
                        <a href="/" onclick="return false" class="bx bx-heart text-black mr-2 text-xl inline"></a>
                    </div>
                    <div class="w-full h-10 flex justify-center items-center text-white">
                        <router-link to="/urunler/id/4564">
                            <p class="transition-all hover:text-blue-700 font-bold text-2xl">Sun Sprayed</p>
                        </router-link>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center">
                        <p class="font-light text-gray-600">Thomas Fotomas</p>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center rounded-b-md">
                        <p class="font-bold text-xs text-gray-400 w-auto overflow-hidden">Satış Fiyatı: {{convertcurr(125)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>