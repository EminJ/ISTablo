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

const getdata = ref()
await useFetch(urlbase+'/api/store/frame/item').then((response) => getdata.value = response.data._rawValue)

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

if(req.value!=null){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"token":"'+cookie.value.key+'"}'
    };

    const data = await fetch(urlbase+'/api/store/basket/favorite', options)
        .then(response => response.json())
        .then(response => response.message)
        .catch(err => console.error(err));

    for (let i = 0; i < getdata.value.length; i++) {
            const element = getdata.value[i];
            for (let j = 0; j < data.length; j++) {
                const element2 = data[j];
                if (element2[0].item.tabloid==element.tabloid) {
                    
                }
            }
        }
}

if(!req.value){
    try {
        if(localStorage.getItem('_favorite')){
        for (let i = 0; i < localStorage.getItem('_favorite').split(':').length; i++) {
            const element = localStorage.getItem('_favorite').split(':')[i];
            for (let j = 0; j < getdata.value.length; j++) {
                const element2 = getdata.value[j];
                if(element==element2.tabloid) document.getElementById(element).style.color='red'
            }
        }
    }
    } catch (error) {
        
    }
}

const favorite = ((id) => {
    if(!req.value){
        if(!localStorage.getItem('_favorite')){
            localStorage.setItem('_favorite',id)
            return document.getElementById(id).style.color='red'
        }
        let data=''
        let input=false
        
        for (let i = 0; i < localStorage.getItem('_favorite').split(':').length; i++) {
            const element = localStorage.getItem('_favorite').split(':')[i];
            if(element==id) input=true
            else data+=element+':'
        }
        localStorage.setItem('_favorite',data)
        if(!input) document.getElementById(id).style.color='red'
        if(input) document.getElementById(id).style.color='grey'
    }
    else {
        const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: '{"id":"'+id+'","token":"'+cookie.value.key+'"}'
        };
    //Favori geri çekme işlemi backendde tamamla...
    //Favori için ekran yenilendiğinde sayfada kırmızı kalması...
        fetch(urlbase + '/api/store/basket/addfavorite', options)
          .then(response => response.json())
          .then(response => {document.getElementById(id).style.color='red'})
          .catch(err => console.error(err));
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
                <div class="flex flex-wrap">
                    <div class="w-80 h-110 bg-black-main rounded-md mx-12 my-7 transition-all shadow-md hover:shadow-gray-900"
                        v-for="getdata in getdata">
                        <div class="w-full h-80 bg-orange-100 rounded-t-md text-right bg-no-repeat bg-cover"
                            :style="{ backgroundImage: 'url(' + urlbase + '/images/' + getdata.images[0].split(',')[0] + ')' }">
                            <a href="/" onclick="return false" @click="favorite(getdata.tabloid)" class="bx bx-heart text-black-main mr-2 text-xl inline" :id="getdata.tabloid"></a>
                        </div>
                        <div class="w-full h-10 flex justify-center items-center text-white">
                            <a :href="'/urunler/id/' + getdata.tabloid">
                                <p class="transition-all hover:text-blue-700 font-bold text-2xl">{{ getdata.title }}</p>
                            </a>
                        </div>
                        <div class="w-full h-8 flex justify-center items-center">
                            <p class="font-light text-gray-600">{{ getdata.explanation }}</p>
                        </div>
                        <div class="w-full h-8 flex justify-center items-center rounded-b-md">
                            <p class="font-bold text-xs text-gray-400 w-auto overflow-hidden">Satış Fiyatı:
                                {{ convertcurr(getdata.price) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>