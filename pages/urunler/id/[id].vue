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

const route = useRoute()

const veriable=ref()
await useFetch(urlbase+'/api/store/frame/item/'+route.params.id).then((response)=> {
    veriable.value=response.data._rawValue || '0'
    if(veriable.value=='0'){
        navigateTo('/')
    }
})


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

const primephoto=ref(veriable.value.images[0].split(',')[0])
const primesize=ref(veriable.value.size[0].split(',')[0])
const primefcolor=ref(veriable.value.color[0].split(',')[0])

const sptcount = ref()
if(!req.value){
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
}
else{

    for (let i = 0; i < req.value.sepet.length; i++) {
        const element = req.value.sepet[i];
        if(element.id==route.params.id){
            if(!sptcount.value) sptcount.value=0
            sptcount.value++
        }
    }
}

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
    else{
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: '{"id":"'+id+'","size":"'+primesize.value+'","color":"'+primefcolor.value+'","token":"'+cookie.value.key+'"}'
        };

        fetch(urlbase+'/api/store/basket/add-to-cart', options)
          .then(response => response.json())
          .then(response => {
            if(response.status==200){
                if(sptcount.value) sptcount.value++
                else sptcount.value=1
            }
          })
          .catch(err => console.error(err));
        }
    })
</script>

<template>
    <NuxtLayout>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-11/12 h-full pt-32 flex flex-row flex-nowrap m-auto">
                <div class="w-1/2 h-full pt-5">
                    <div class="w-3/4 m-auto h-full">
                        <img :src="urlbase+'/images/'+primephoto" alt="" class="w-3/4 rounded-md">
                        <div class="h-1/5 overflow-hidden mt-5 flex flex-nowrap">
                            <div v-for="photo in veriable.images[0].split(',')">
                                <img :src="urlbase+'/images/'+photo" v-if="photo==primephoto" class="w-24 h-24 mx-1 border-4 border-orange-main rounded-md">
                                <img :src="urlbase+'/images/'+photo" v-if="photo!=primephoto" @click="primephoto=photo" class="w-24 h-24 mx-1 rounded-md hover:border-4 hover:border-orange-main">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-full pt-5 flex flex-col justify-between py-10">
                    <div>
                        <h1 class="pt-5 text-3xl font-bold">{{veriable.title}}</h1>
                            <h3 class="pt-2 texp-sm font-light">{{veriable.explanation}}</h3>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Size:</p>
                            <div v-for="sz in veriable.size[0].split(',')">
                                <a v-if="sz==primesize" href="/" onclick="return false" class="w-auto h-auto px-4 py-2 rounded mx-2 border-2 border-orange-main">{{ sz }}</a>
                                <a v-if="sz!=primesize" href="/" onclick="return false" @click="primesize=sz" class="w-auto h-auto border-white-main px-4 py-2 rounded mx-2 border-2 hover:border-orange-main">{{ sz }}</a>
                            </div>
                        </div>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Frame Color:</p>
                            <div v-for="clr in veriable.color[0].split(',')">
                                <div :style={backgroundColor:clr} v-if="clr==primefcolor" class="w-10 h-10 rounded-full mx-2 border-2 border-orange-main"></div>
                                <div :style={backgroundColor:clr} v-if="clr!=primefcolor" @click="primefcolor=clr" class="w-10 h-10 rounded-full mx-2 border-2 border-transparent hover:border-orange-main"></div>
                            </div>
                        </div>

                    </div>
                    <div class="w-full h-auto flex flex-nowrap my-5 justify-end items-center">
                        <p class="text-gray-300 font-thin italic text-lg mr-5">{{veriable.type}} / {{veriable.category}}</p>
                        <p class="text-xl font-serif">{{convertcurr(veriable.price)}}</p>
                        <a href="/" onclick="return false" @click="sepetekle(route.params.id)" class="text-xl font-serif mx-6 border border-orange-main px-5 py-2 rounded hover:bg-orange-main hover:text-black-main transition-all">{{sptcount}} Sepete Ekle</a>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>