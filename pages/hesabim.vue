<script setup>
import { ref } from "vue";
import tr from "@/lang/tr-TR";
import en from "@/lang/en-EN";
const cookie=useCookie('connect.sid')
if(!cookie.value) navigateTo('/')
const urlbase = 'http://localhost:1000'
const lang = ref()
const language=useCookie('language')
if(language.value=='TR') lang.value=tr
if(language.value=='EN') lang.value=en
const showarea = ref(0)
//Kontrol için token içine girilebilir, gerçekten değer var mı? Diye.
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"token":"'+useCookie('connect.sid').value+'"}'
};
const data = ref(400)
data.value = await fetch(urlbase+'/api/auth/usertested',options)
.then(async (data)=> {
  let text = await data.text()
  return JSON.parse(text).message.user})
function changearea(num){
  showarea.value=num
}
</script>

<template>
  <div>
    <div class="w-full h-screen bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
        <div class="w-3/5 h-full"></div>
        <div class="w-2/5 h-full bg-black-main shadow-gray-900 shadow-sm hover:shadow-lg hover:shadow-gray-900 transition-all">
          <p class="font-serif text-6xl text-orange-main m-10 w-96">{{ lang.klncadt }}</p>
          <p class="italic text-sm text-white-main mx-10">
            {{ lang.klnayrt }}
          </p>
          <div class="w-full h-auto px-10 my-10">
            <div class="w-full h-auto p-5 flex flex-nowrap">
              <div class="w-2/5">
                <!--Hizmet Seçenekleri-->
                <ul>
                  <a class="bg-orange-main text-black-main"></a>
                  <a href="/" onclick="return false" @click="changearea(0)">
                    <li v-if="showarea==0" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class="bx bx-user"></i> {{ lang.klnayrmn }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class="bx bx-user"></i> {{ lang.klnayrmn }}</li>
                  </a>
                  <a href="/" onclick="return false" @click="changearea(1)">
                    <li v-if="showarea==1" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-heart'></i>  {{ lang.klnfvrt }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-heart'></i> {{ lang.klnfvrt }}</li>
                  </a>
                  <a href="/" onclick="return false" @click="changearea(2)">
                    <li v-if="showarea==2" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-map-pin'></i> {{ lang.klnadrsay }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-map-pin'></i> {{ lang.klnadrsay }}</li>
                  </a>
                  <a href="/" onclick="return false" @click="changearea(3)">
                    <li v-if="showarea==3" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-credit-card-front'></i> {{ lang.krblerm }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-credit-card-front'></i> {{ lang.krblerm }}</li>
                  </a>
                </ul>
              </div>
              <div class="w-3/5 pl-5 mt-2">
                <!--Değişen Boş Alan-->
                <div class="w-full h-auto rounded-md bg-gray-600 p-5 flex flex-col">
                  <div v-show="showarea==0">
                    <!--Kullanıcı Bilgileri-->
                    <div class="flex flex-nowrap">
                      <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncayad }}</p>
                      <input type="text" class="w-full h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="data.name" disabled>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncaysad }}</p>
                      <input type="text" class="w-full h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="data.name" disabled>
                    </div>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncayeml }}</p>
                      <input type="text" class="w-9/12 h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="data.email" disabled>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncayphnt }}</p>
                      <div class="flex flex-nowrap items-center w-4/5 h-9 rounded-md bg-gray-500 text-gray-300 mt-1">
                        <p class="ml-2">+90</p>
                        <input type="number" class="w-full h-full rounded-md bg-gray-500 focus:outline-none ml-2">
                        <button class="bg-orange-main p-1 rounded-md text-white">{{ lang.klncakayt }}</button>
                      </div>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncacnsyt }}</p>
                      <div class="flex flex-nowrap text-lg">
                        <span class="mr-5"><input type="checkbox"> {{ lang.cnskadn }}</span>
                        <span><input type="checkbox"> {{ lang.cnserk }}</span>
                      </div>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.sfrdegstr }}</p>
                      <div class="flex flex-nowrap items-center w-4/5 h-9 rounded-md bg-gray-500 text-gray-300 mt-1">
                        <input type="password" class="w-full h-full rounded-md bg-gray-500 focus:outline-none px-1">
                        <button class="bg-orange-main p-1 rounded-md text-white">{{ lang.klncakayt }}</button>
                      </div>
                    </div>
                  </div>
                  <div v-show="showarea==1" class="max-h-96">
                    <!--Favori Ürünler-->
                    <p class="text-base">{{ lang.fvrurnlm }}</p>
                      <div class="w-full h-16 bg-gray-200 rounded-md my-1 flex flex-nowrap text-black-main">
                        <img src="/images/items/Elegant-Flower-Head-Art.webp" class="max-w-1/5 h-full p-1 rounded-lg">
                        <div class="w-4/5 h-full flex flex-col">
                          <div class="w-full h-1/2 flex justify-between">
                            <NuxtLink to="items/46446545645">
                              <p>Başlık</p>
                            </NuxtLink>
                            <p>250 ₺</p>
                          </div>
                          <div class="w-full h-1/2 flex flex-nowrap justify-between">
                            <p class="font-light text-sm w-auto h-5 overflow-hidden break-words">Açıklama</p>
                            <a href="/" onclick="return false"><i class="bx bx-heart text-red-600 hover:text-black"></i></a>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div v-show="showarea==2">
                    <!--Adres Bilgileri-->
                    <p class="text-base">{{ lang.adrsblgm }}</p>
                    <div class="w-auto h-auto flex mt-2">
                      <div class="flex flex-col">
                        <p class="pr-3 pl-1 border-r border-gray-400 mr-2">Ev</p>
                      </div>
                      <div class="flex flex-col items-end">
                        <p class="font-light">İzmirli Niyazi Sk. No:2, Topkapı, 34093 Fatih/İstanbul</p>
                        <div class="flex flex-nowrap items-end">
                          <a href="/" onclick="return false" class="text-white text-base hover:text-red-200 transition-all mr-5"><i class='bx bx-trash'></i></a>
                        <a href="/" onclick="return false" class="border border-gray-300 hover:text-orange-main hover:border-orange-main transition-all px-3 py-1 rounded">{{ lang.adrsdznl }}</a>
                        </div>
                      </div>
                    </div>
                    <a href="/" onclick="return false" class="mt-5 bg-green-700 hover:bg-green-600 transition-all inline-block px-5 py-2 rounded">{{ lang.ynbadsekl }}</a>
                  </div>
                  <div v-show="showarea==3">
                    <!--Kredi Kart Bilgileri-->
                    <div class="w-full bg-gray-700 pb-5 rounded-md flex flex-col flex-nowrap shadow-gray-800 shadow-sm">
                      <div class="w-full h-auto py-2 text-white-main text-right font-bold px-5">VISA</div>
                      <div class="w-14 h-10 rounded bg-orange-300 mx-5">
                        
                      </div>
                      <div class="w-full h-auto text-white-main font-sans px-5 text-xl mt-3">
                        5460 9700 0000 0000
                      </div>
                      <div class="w-full h-auto flex justify-between text-white-main font-sans px-5 text-sm mt-4">
                        <p>00/00</p> <p>MUHAMMET EMİN GÜLEŞCİ</p>
                      </div>
                    </div>
                    <div class="flex flex-nowrap justify-between">
                      <a href="/" onclick="return false" class="mt-5 bg-orange-400 hover:bg-orange-500 transition-all inline-block px-5 py-2 rounded">Kartı Düzenle</a>
                    <a href="/" onclick="return false" class="mt-5 bg-green-700 hover:bg-green-600 transition-all inline-block px-5 py-2 rounded">Yeni Kart Ekle</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>