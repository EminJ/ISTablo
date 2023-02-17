<script setup>
import NuxtLayout from '@/layout/default.vue'
import { ref } from "vue";
import tr from "@/lang/tr-TR";
import en from "@/lang/en-EN";
const cookie = useCookie('connect.sid')
const urlbase = 'http://localhost:1000'
try {
  if (!cookie.value) {
    cookie.value = { language: 'TR', currency: 'TL' }
  }
} catch (error) { }

const lang = ref()
try {
  if (cookie.value.language == 'TR') lang.value = tr
  if (cookie.value.language == 'EN') lang.value = en
} catch (error) {
  lang.value = tr
}

const curr = ref()
try {
  if (cookie.value.currency == 'TL') curr.value = -1
  if (cookie.value.currency == 'USD') curr.value = 0
  if (cookie.value.currency == 'EURO') curr.value = 3
} catch (error) {
  curr.value = -1
}

const { data, pending, error, refresh } = await useFetch('http://hasanadiguzel.com.tr/api/kurgetir')
const veri = data._rawValue.TCMB_AnlikKurBilgileri
function convertcurr(price) {
  if (curr.value == -1) return '₺' + price.toFixed(2);
  if (curr.value == 0) return '$' + (price / veri[curr.value].ForexSelling).toFixed(2);
  if (curr.value == 3) return '€' + (price / veri[curr.value].ForexSelling).toFixed(2);
}
//{{convertcurr(125)}}

const req = ref()
try {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"token":"' + cookie.value.key + '"}'
  };
  req.value = await fetch(urlbase + '/api/auth/usertested', options)
    .then(async (req) => {
      let text = await req.text()
      return JSON.parse(text).message.user
    })
  if (!req.value) {
    cookie.value.key = undefined;
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
  }
} catch (error) {
  cookie.value.key = undefined;
  cookie.value = JSON.parse(JSON.stringify(cookie.value));
}
//req.value==null = giriş yapılmamış.

const res = ref()
const toplam = ref(0)

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: '{"token":"' + cookie.value.key + '"}'
};

res.value = await fetch(urlbase + '/api/store/basket/show', options)
  .then(response => response.json())
  .then(response => {
    for (let i = 0; i < response.message.length; i++) {
      const element = response.message[i];
      toplam.value += element[0].item.price
    }
    if (toplam.value < 100) toplam.value += 19
    return response.message
  })
  .catch(err => console.error(err));

const primeadres = ref(req.value.adres[0].adresbaslik + req.value.adres[0].adres)
const primecart = ref(req.value.kartbilgileri[0].cartnum + req.value.kartbilgileri[0].cartdate + req.value.kartbilgileri[0].cartname)

</script>

<template>
  <NuxtLayout>
    <div class="w-full h-screen bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-nowrap justify-between">
        <div class="w-1/2">
          <div class="w-full flex flex-col m-2 h-auto">
          <h1 class="mx-2 text-lg mb-1">Adres Seçimi</h1>
          <div class="flex flex-nowrap">
            <div v-for="adres in req.adres">
              <div v-if="primeadres==adres.adresbaslik+adres.adres"
                class="rounded p-2 w-64 h-36 mx-2 flex mt-2 border border-orange-main">
                <div class="flex flex-col">
                  <p class="pr-3 pl-1 border-r border-gray-400 mr-2">{{adres.adresbaslik}}</p>
                </div>
                <div class="flex flex-col items-end">
                  <p class="font-light">{{adres.adres}}</p>
                </div>
              </div>
              <div @click="primeadres=adres.adresbaslik+adres.adres" v-if="primeadres!=adres.adresbaslik+adres.adres"
                class="hover:border-orange-main rounded p-2 w-64 h-36 mx-2 flex mt-2 border border-white">
                <div class="flex flex-col">
                  <p class="pr-3 pl-1 border-r border-gray-400 mr-2">{{adres.adresbaslik}}</p>
                </div>
                <div class="flex flex-col items-end">
                  <p class="font-light">{{adres.adres}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col m-2 h-auto">
          <h1 class="mx-2 text-lg mb-1">Kart Seçimi</h1>
          <div class="flex flex-nowrap">
            <div v-for="cart in req.kartbilgileri" class="flex">
              <div v-if="primecart==cart.cartnum+cart.cartdate+cart.cartname" class="mx-2 border border-orange-main w-80 mb-2 bg-gray-700 pb-5 rounded-md flex flex-col flex-nowrap shadow-gray-800 shadow-sm">
                <div class="w-full h-auto py-2 text-white-main text-right font-bold px-5 flex justify-end">
                  <p>VISA</p>
                </div>
                <div class="w-14 h-10 rounded bg-orange-300 mx-5">
                </div>
                <div class="w-full h-auto text-white-main font-sans px-5 text-xl mt-3">
                  {{ cart.cartnum }}
                </div>
                <div class="w-full h-auto flex justify-between text-white-main font-sans px-5 text-sm mt-4">
                  <p>{{cart.cartdate}}</p>
                  <p>{{ cart.cartname }}</p>
                </div>
              </div>
              <div v-if="primecart!=cart.cartnum+cart.cartdate+cart.cartname" @click="primecart=cart.cartnum+cart.cartdate+cart.cartname" class="border hover:border-orange-main mx-2 w-80 mb-2 bg-gray-700 pb-5 rounded-md flex flex-col flex-nowrap shadow-gray-800 shadow-sm">
                <div class="w-full h-auto py-2 text-white-main text-right font-bold px-5 flex justify-end">
                  <p>VISA</p>
                </div>
                <div class="w-14 h-10 rounded bg-orange-300 mx-5">
                </div>
                <div class="w-full h-auto text-white-main font-sans px-5 text-xl mt-3">
                  {{ cart.cartnum }}
                </div>
                <div class="w-full h-auto flex justify-between text-white-main font-sans px-5 text-sm mt-4">
                  <p>{{cart.cartdate}}</p>
                  <p>{{ cart.cartname }}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 flex justify-end">
          <div class="w-64 px-2 rounded h-auto m-4 bg-gray-700 text-gray-200 flex flex-col justify-between">
            <div>
              <p class="text-center py-2 rounded flex justify-center content-center font-bold mb-2">Sipariş Özeti</p>
              <p class="flex justify-between my-1"><span>Ara Toplam</span> <span>₺319</span></p>
              <p class="flex justify-between my-1"><span>Kargo</span> <span>₺20</span></p>
              <p class="flex justify-between mb-3"><span>100TL Üzeri Kargo Bedava</span> <span>-₺20</span></p>
              <hr>
              <p class="flex justify-between mt-3"><span>Toplam</span> <span>₺319</span></p>
            </div>
            <div class="flex flex-col justify-end mb-2">
              <div class="w-full h-12 bg-green-600 rounded mt-10 flex flex-col justify-center items-center">
                <p class="font-bold">Ödeme Alındı 👍</p>
                <a href="/" class="text-xs">Ana Sayfaya Dön</a>
              </div>
              <div class="flex justify-end"><a href="/" onclick="return false" class="mt-5 bg-green-700 hover:bg-green-600 transition-all inline-block px-5 py-2 rounded">Ödeme Yap</a></div>
            </div>
          </div>
        </div>
          
      </div>
    </div>
  </NuxtLayout>
</template>