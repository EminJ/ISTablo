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
  if(!req.value) navigateTo('/giris')
  const exit = (()=>{
    cookie.value.key = undefined;
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
    navigateTo('/')
  })

  const showarea = ref(0)
  function changearea(num){
    showarea.value=num
  }
  if(!req.value.name){
    cookie.value.key = undefined;
    cookie.value = JSON.parse(JSON.stringify(cookie.value));
    navigateTo('/giris')
  }

  const cartname=ref(''),cartdate1=ref(''),cartdate2=ref(''),cartnum=ref(''),cartcvc=ref(''),cartoptions=ref(false),adresoptions=ref(false),adresbaslik=ref(),adres=ref(),phone=ref()
  const addcard=(()=>{
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"cartcvc":"'+cartcvc.value+'","cartdate":"'+cartdate1.value+'/'+cartdate2.value+'","cartname":"'+cartname.value+'","cartnum":"'+cartnum.value+'","token":"'+cookie.value.key+'"}'
  };

  fetch(urlbase+'/api/auth/account/cartadd', options)
    .then(response => response.json())
    .then(response => {
      if(response.status==200){
        cartoptions.value=false
          req.value.kartbilgileri.push({cartcvc:cartcvc.value,cartdate:cartdate1.value+'/'+cartdate2.value,cartname:cartname.value,cartnum:cartnum.value})
        }
    })
    .catch(err => console.error(err));
    })

  const addadres=(()=>{
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"adresbaslik":"'+adresbaslik.value+'","adres":"'+adres.value+'","token":"'+cookie.value.key+'"}'
  };

  fetch(urlbase+'/api/auth/account/adresadd', options)
    .then(response => response.json())
    .then(response =>{
        if(response.status==200){
          adresoptions.value=false
          req.value.adres.push({adresbaslik:adresbaslik.value,adres:adres.value})
        }
      }
    )
    .catch(err => console.error(err));
    })

    const addphone=(()=>{
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"phone":"'+phone.value+'","token":"'+cookie.value.key+'"}'
  };

  fetch(urlbase+'/api/auth/account/addphone', options)
    .then(response => response.json())
    .then(response =>{
        if(response.status==200){
          req.value.phone=phone.value
        }
      }
    )
    .catch(err => console.error(err));
    })

  const delladres=((adresbaslik,adres)=>{
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"adresbaslik":"'+adresbaslik+'","adres":"'+adres+'","token":"'+cookie.value.key+'"}'
  };

  fetch(urlbase+'/api/auth/account/adresdell', options)
    .then(response => response.json())
    .then(response => {
      if(response.status==200){
        document.getElementById(adresbaslik+adres).style.display='none'
      }
    })
    .catch(err => console.error(err));
    })

  const dellcart=((cartnum,cartdate,cartname)=>{
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"cartnum":"'+cartnum+'","cartdate":"'+cartdate+'","cartname":"'+cartname+'","token":"'+cookie.value.key+'"}'
  };

  fetch(urlbase+'/api/auth/account/cartdell', options)
    .then(response => response.json())
    .then(response => {
      if(response.status==200){
        document.getElementById(cartnum+cartdate+cartname).style.display='none'
      }
    })
    .catch(err => console.error(err));
    })

    const name=((name)=>{
      let data = ''
      for (let i = 0; i < name.split(' ').length-1; i++) {
        const element = name.split(' ')[i];
        data+=element
        if(i!=name.split(' ').length-2)data+=' '
      }
      return data
    })
    
</script>

<template>
  <NuxtLayout>
    <div class="w-full min-h-screen h-auto bg-gray-background block text-white">
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
        <div class="w-3/5 h-full"></div>
        <div class="w-2/5 h-full bg-black-main shadow-gray-900 shadow-sm hover:shadow-lg hover:shadow-gray-900 transition-all">
          <p class="font-serif text-6xl text-orange-main m-10 w-auto">{{ lang.klncadt }}</p>
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
                    <li v-if="showarea==1" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-map-pin'></i> {{ lang.klnadrsay }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-map-pin'></i> {{ lang.klnadrsay }}</li>
                  </a>
                  <a href="/" onclick="return false" @click="changearea(2)">
                    <li v-if="showarea==2" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-credit-card-front'></i> {{ lang.krblerm }}</li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-credit-card-front'></i> {{ lang.krblerm }}</li>
                  </a>
                  <a href="/" onclick="return false" @click="changearea(3)">
                    <li v-if="showarea==3" class="w-full my-2 px-6 py-4 bg-orange-main rounded-3xl text-black-main"><i class='bx bx-exit'></i> Çıkış Yap </li>
                    <li v-else class="w-full my-2 px-6 py-4 bg-gray-700 rounded-3xl text-white-main"><i class='bx bx-exit'></i> Çıkış Yap </li>
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
                      <input type="text" class="w-full h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="name(req.name)" disabled>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncaysad }}</p>
                      <input type="text" class="w-full h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="req.name.split(' ')[req.name.split(' ').length-1]" disabled>
                    </div>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncayeml }}</p>
                      <input type="text" class="w-9/12 h-9 rounded-md bg-gray-500 focus:outline-none focus:bg-gray-400 px-1 text-gray-300 mt-1" :value="req
                      .email" disabled>
                    </div>
                    <div class="m-2">
                      <p class="text-gray-200">{{ lang.klncayphnt }}</p>
                      <div class="flex flex-nowrap items-center w-4/5 h-9 rounded-md bg-gray-500 text-gray-300 mt-1">
                        <p class="ml-2">+90</p>
                        <input v-show="!req.phone" v-model="phone" type="text" class="w-full h-full rounded-md bg-gray-500 focus:outline-none ml-2">
                        <input v-show="req.phone" type="text" disabled class="w-full h-full rounded-md bg-gray-500 focus:outline-none ml-2" :value="req.phone">
                        <button v-show="!req.phone" @click="addphone()" class="bg-orange-main p-1 rounded-md text-white">{{ lang.klncakayt }}</button>
                      </div>
                    </div>
                    
                  </div>
                  <div v-show="showarea==1">
                    <!--Adres Bilgileri-->
                    <p class="text-base">{{ lang.adrsblgm }}</p>
                    <div v-if="adresoptions" class="form mb-2">
                      <input type="text" v-model="adresbaslik" class="w-auto h-8 bg-white my-1 rounded pl-2 focus:outline-none text-black-main" placeholder="Adres Başlığı">
                      <input type="text" v-model="adres" class="w-full h-8 bg-white my-1 rounded pl-2 focus:outline-none text-black-main" placeholder="Adres">
                      <a href="/" onclick="return false" @click="addadres()" class="my-1 bg-green-700 hover:bg-green-600 transition-all inline-block px-2 py-1 rounded">Kaydet</a>
                    </div>
                    <div  v-for="adres in req.adres" class="w-auto h-auto flex mt-2" :id="adres.adresbaslik+adres.adres">
                      <div class="flex flex-col">
                        <p class="pr-3 pl-1 border-r border-gray-400 mr-2">{{adres.adresbaslik}}</p>
                      </div>
                      <div class="flex flex-col items-end">
                        <p class="font-light">{{adres.adres}}</p>
                        <div class="flex flex-nowrap items-end">
                          <a href="/" onclick="return false" class="text-white text-base hover:text-red-200 transition-all mr-5"><i @click="delladres(adres.adresbaslik,adres.adres)" class='bx bx-trash'></i></a>
                        </div>
                      </div>
                    </div>
                    <a href="/" onclick="return false" @click="adresoptions=true" class="mt-5 bg-green-700 hover:bg-green-600 transition-all inline-block px-5 py-2 rounded">{{ lang.ynbadsekl }}</a>
                  </div>
                  <div v-show="showarea==2">
                    <!--Kredi Kart Bilgileri-->
        
                    <div v-if="cartoptions" class="form mb-2">
                      <input type="text" v-model="cartname" class="w-full h-8 bg-white my-1 rounded pl-2 focus:outline-none text-black-main" placeholder="Kart Üzerindeki İsim Soy İsim">
                      <input type="text" v-model="cartnum" class="w-full h-8 bg-white my-1 rounded pl-2 focus:outline-none text-black-main" placeholder="Kart Numarası">
                      <div class="flex">
                        <div class="w-24 h-8 rounded flex my-1">
                          <input type="text" v-model="cartdate1" placeholder="00" class="w-8 h-6 bg-white rounded focus:outline-none text-black-main px-1">
                          <p class="mx-1">/</p>
                          <input type="text" v-model="cartdate2" placeholder="00" class="w-8 h-6 bg-white rounded focus:outline-none text-black-main px-1">
                        </div>
                        <input type="number" v-model="cartcvc" placeholder="CVC" class="w-12 h-6 my-1 bg-white rounded focus:outline-none text-black-main px-1">
                      </div>
                      <a href="/" onclick="return false" @click="addcard()" class="my-1 bg-green-700 hover:bg-green-600 transition-all inline-block px-2 py-1 rounded">Kaydet</a>
                    </div>
                    <div v-for="cart in req.kartbilgileri" class="w-full mb-2 bg-gray-700 pb-5 rounded-md flex flex-col flex-nowrap shadow-gray-800 shadow-sm" :id="cart.cartnum+cart.cartdate+cart.cartname">
                      <div class="w-full h-auto py-2 text-white-main text-right font-bold px-5 flex justify-between"><i @click="dellcart(cart.cartnum,cart.cartdate,cart.cartname)" class='bx bx-trash hover:text-orange-main'></i><p>VISA</p></div>
                      <div class="w-14 h-10 rounded bg-orange-300 mx-5">
                      </div>
                      <div class="w-full h-auto text-white-main font-sans px-5 text-xl mt-3">
                        {{ cart.cartnum }}
                      </div>
                      <div class="w-full h-auto flex justify-between text-white-main font-sans px-5 text-sm mt-4">
                        <p>{{cart.cartdate}}</p> <p>{{ cart.cartname }}</p>
                      </div>
                      </div>
                    <div class="flex flex-nowrap justify-between">
                    <a href="/" onclick="return false" class="mt-5 bg-green-700 hover:bg-green-600 transition-all inline-block px-5 py-2 rounded" @click="cartoptions=true">Yeni Kart Ekle</a>
                    </div>
                  </div>
                  <div v-show="showarea==3">
                    <!--Çıkış Yap-->
                    <h1 class="font-bold mb-4">Çıkış Yap</h1>
                    Bu işlem için Emin misiniz ?
                    <div class="flex flex-nowrap justify-between">
                      <a href="/" onclick="return false" class="mt-5 bg-orange-400 hover:bg-orange-500 transition-all inline-block px-5 py-2 rounded" @click="exit()">Evet</a>
                    </div>
                  </div>
                </div>
              </div>
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