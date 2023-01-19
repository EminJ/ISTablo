<script setup>
  import NuxtLayout from '@/layout/default.vue'
  import { ref } from "vue";
  import tr from "@/lang/tr-TR";
  import en from "@/lang/en-EN";
  const urlbase = 'http://localhost:1000'
  const cookie=useCookie('connect.sid')
  const lang = ref()
  if(cookie.value.language=='TR') lang.value=tr
  if(cookie.value.language=='EN') lang.value=en
  let open = ref(true),name=ref(''),email=ref(''),password=ref(''),mail=ref(''),pass=ref(''),message=ref('')
  const show=(()=> open.value=!open.value)
  const register = (async ()=> {
    await fetch(urlbase+'/api/Auth/create', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{"name":"'+name.value+'","email":"'+email.value+'","password":"'+password.value+'"}'})
    .then(async (data)=> {
      const text = await data.text();
      const obj = JSON.parse(text);
      if(obj.status!=200) message.value=obj.message
      else {
        const cookie= useCookie('connect.sid')
        cookie.value.key=obj.message
        message.value=''
        return navigateTo('/')
      }
    })
    .catch((err)=> console.log(err))
  })
  const login = (async ()=> {
    await fetch(urlbase+'/api/Auth/login', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{"email":"'+mail.value+'","password":"'+pass.value+'"}'})
    .then(async (data)=> {
      const text = await data.text();
      const obj = JSON.parse(text);
      if(obj.status!=200) message.value=obj.message
      else {
        const cookie= useCookie('connect.sid')
        cookie.value={ key:obj.message, language:'TR', currency:'TL' }
        message.value=''
        return navigateTo('/')
      }
    })
    .catch((err)=> console.log(err))
  })
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-screen bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
        <div class="w-1/2 h-full flex justify-center items-start">
          <div class="w-4/5 h-full block mx-5 rounded-lg p-4 bg-gray-primary shadow-lg shadow-black">
            <div class="p-10 h-auto">
              <p v-show="open" class="font- text-5xl font-black text-white pb-10">{{ lang.grsypt }}</p>
              <p v-show="!open" class="font- text-5xl font-black text-white pb-10">{{ lang.kytol }}</p>
            <p class=" font-light text-gray-400 pb-10 w-4/5">
              {{ lang.grsmtn }}
            </p>
            <div v-show="open">
              <input type="text" v-model="mail" :placeholder="lang.epgrs" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2 mr-5 mb-5"/>
              <input type="password" v-model="pass" :placeholder="lang.sfrgs" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2"/><br>
              <button @click="login" class="w-32 py-2 px-3 bg-slate-600 rounded-sm transition-all hover:bg-gray-800 my-5">{{ lang.grsypbtn }}</button>
              <span class="mx-5">{{ lang.hsbnykm }} <a @click="show" href="/" onclick="return false" class="text-orange-main font-bold">{{ lang.kytolbtn }}</a></span>
            </div>
            <div v-show="!open">
              <input type="text" v-model="name" :placeholder="lang.adsgrs" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2 mr-5 mb-5"/>
              <input type="text" v-model="email" :placeholder="lang.epgrs" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2 mr-5 mb-5"/>
              <input type="password" v-model="password" :placeholder="lang.sfrgs" class="w-96 py-2 px-4 rounded-full border-b-4 border-transparent focus:outline-none focus:border-orange-main text-black-main my-2"/><br>
              <button @click="register" class="w-32 py-2 px-3 bg-slate-600 rounded-sm transition-all hover:bg-gray-800 my-5">{{ lang.kytolbtn }}</button>
              <span class="mx-5">{{ lang.hsbnvm }} <a @click="show" href="/" onclick="return false"  class="text-orange-main font-bold">{{ lang.grsypbtn }}</a></span>
              </div>
            </div>
            <div v-show="message!=''" class="w-96 overflow-hidden h-12 bg-red-500 rounded-md ml-10 flex items-center p-2">
                <i class="bx bxs-bell text-2xl mr-4"></i>
                <p>{{message}}</p>
              </div>
          </div>
        </div>
        <div class="w-1/2 flex justify-center items-center">
          <!--Doldurulabilir// RESİM VEYA SİTE İÇİ İÇERİK İLE-->
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>