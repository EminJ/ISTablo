<script setup>
import { ref } from "vue";
const curr = ref()
const currency=useCookie('currency')
if(currency.value=='TL') curr.value=-1
if(currency.value=='USD') curr.value=0
if(currency.value=='EURO') curr.value=3
const { data, pending, error, refresh } = await useFetch('http://hasanadiguzel.com.tr/api/kurgetir')
const veri=data._rawValue.TCMB_AnlikKurBilgileri
function convertcurr(price){
    if(curr.value == -1) return '₺'+price
    if(curr.value == 0) return '$'+(price/veri[curr.value].ForexSelling).toFixed(2);
    if(curr.value == 3) return '€'+(price/veri[curr.value].ForexSelling).toFixed(2);
}
</script>

<template>
    <div>
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
                    <div class="w-full h-80 bg-orange-100 rounded-t-md" style="background: url('/images/items/Elegant-Flower-Head-Art.webp') no-repeat; background-size: contain;">
                        </div>
                    <div class="w-full h-10 flex justify-center items-center text-white">
                        <NuxtLink to="/urunler/id/4564">
                            <p class="transition-all hover:text-blue-700 font-bold text-2xl">Sun Sprayed</p>
                        </NuxtLink>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center">
                        <p class="font-light text-gray-600">Thomas Fotomas</p>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center rounded-b-md">
                        <p class="font-bold text-xs text-gray-400 w-20 overflow-hidden">From: {{convertcurr(125)}}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>