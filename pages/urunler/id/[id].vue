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
    cookie.value=cookie.value.key=null
  } 
} catch (error) {
  cookie.value=cookie.value.key=null
}
//req.value==null = giriş yapılmamış.

//Veritabanından çekilecek
const photo=ref(['/images/items/Elegant-Flower-Head-Art.webp','/images/items/Elegant-Flower-Head-Art-.webp','/images/items/Elegant-Flower-Head-Art-.webp','/images/items/Elegant-Flower-Head-Art-.webp'])
const size=ref(['24x36','32x48','40x60','48x72'])
const fcolor=ref(['white','red','green','blue'])

const primephoto=ref(photo.value[0])
const primesize=ref(size.value[0])
const primefcolor=ref(fcolor.value[0])

const route = useRoute()
const sptcount = ref()
try {
    const storage = await localStorage.getItem('_basket')
    if(storage){
        for (let i = 0; i < storage.split(':').length; i++) {
            const element = storage.split(':')[i].split(',')[0];
            if(element==route.params.id){
                if(!sptcount.value) sptcount.value=0
                sptcount.value++
            } 
        }
    }
} catch (error) {}

const sepetekle=((id)=>{
    if(!req.value){
        //ÜRÜN ÖZELLİKLERİDE TUTULACAK

        if(!localStorage.getItem('_basket')){
            if(!sptcount.value) sptcount.value=0
            sptcount.value++
            let prob=id+','+primefcolor.value+','+primesize.value
            return localStorage.setItem('_basket',prob)
        }
        let prob=id+','+primefcolor.value+','+primesize.value
        localStorage.setItem('_basket',localStorage.getItem('_basket')+':'+prob)
        sptcount.value++
    }
})

</script>

<template>
    <NuxtLayout>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-11/12 h-full pt-32 flex flex-row flex-nowrap m-auto">
                <div class="w-1/2 h-full pt-5">
                    <div class="w-3/4 m-auto h-full">
                        <img :src="primephoto" alt="" class="w-3/4 rounded-md">
                        <div class="h-1/5 overflow-hidden mt-5 flex flex-nowrap">
                            <div v-for="photo in photo">
                                <img :src="photo" v-if="photo==primephoto" class="w-24 h-24 mx-1 border-4 border-orange-main rounded-md">
                                <img :src="photo" v-if="photo!=primephoto" @click="primephoto=photo" class="w-24 h-24 mx-1 rounded-md hover:border-4 hover:border-orange-main">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-full pt-5 flex flex-col justify-between py-10">
                    <div>
                        <h1 class="pt-5 text-3xl font-bold">I Fell in Love With Fall Because of You</h1>
                            <h3 class="pt-2 texp-sm font-light">Flower Head Wall Art by Frank Moth</h3>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Size:</p>
                            <div v-for="sz in size">
                                <a v-if="sz==primesize" href="/" onclick="return false" class="w-auto h-auto px-4 py-2 rounded mx-2 border-2 border-orange-main">{{ sz }}</a>
                                <a v-if="sz!=primesize" href="/" onclick="return false" @click="primesize=sz" class="w-auto h-auto border-white-main px-4 py-2 rounded mx-2 border-2 hover:border-orange-main">{{ sz }}</a>
                            </div>
                        </div>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Frame Color:</p>
                            <div v-for="clr in fcolor">
                                <div :style={backgroundColor:clr} v-if="clr==primefcolor" class="w-10 h-10 rounded-full mx-2 border-2 border-orange-main"></div>
                                <div :style={backgroundColor:clr} v-if="clr!=primefcolor" @click="primefcolor=clr" class="w-10 h-10 rounded-full mx-2 border-2 border-transparent hover:border-orange-main"></div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-auto flex flex-nowrap my-5 justify-end items-center">
                        <p class="text-xl font-serif">{{convertcurr(125)}}</p>
                        <a href="/" onclick="return false" @click="sepetekle(route.params.id)" class="text-xl font-serif mx-6 border border-orange-main px-5 py-2 rounded hover:bg-orange-main hover:text-black-main transition-all">{{sptcount}} Sepete Ekle</a>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>