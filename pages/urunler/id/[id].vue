<script setup>
import NuxtLayout from '@/layout/default.vue'
import { ref } from "vue";
import tr from "@/lang/tr-TR";
import en from "@/lang/en-EN";

const cookie=useCookie('connect.sid')
const lang = ref()
if(cookie.value.language=='TR') lang.value=tr
if(cookie.value.language=='EN') lang.value=en

const curr = ref()
const route = useRoute()
if(cookie.value.currency=='TL') curr.value=-1
if(cookie.value.currency=='USD') curr.value=0
if(cookie.value.currency=='EURO') curr.value=3
const { data, pending, error, refresh } = await useFetch('http://hasanadiguzel.com.tr/api/kurgetir')
const veri=data._rawValue.TCMB_AnlikKurBilgileri
function convertcurr(price){
    if(curr.value == -1) return '₺'+price.toFixed(2);
    if(curr.value == 0) return '$'+(price/veri[curr.value].ForexSelling).toFixed(2);
    if(curr.value == 3) return '€'+(price/veri[curr.value].ForexSelling).toFixed(2);
}
</script>

<template>
    <NuxtLayout>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-11/12 h-full pt-32 flex flex-row flex-nowrap m-auto">
                <div class="w-1/2 h-full pt-5">
                    <div class="w-3/4 m-auto h-full">
                        <img src="/images/items/Elegant-Flower-Head-Art.webp" alt="" class="w-3/4 rounded-md">
                        <div class="h-1/5 overflow-hidden mt-5 flex flex-nowrap">
                            <img src="/images/items/Elegant-Flower-Head-Art.webp" alt="" class="w-24 h-24 mx-1 border-4 border-orange-main rounded-md">
                            <img src="/images/items/Elegant-Flower-Head-Art-.webp" alt="" class="w-24 h-24 mx-1 rounded-md hover:border-4 hover:border-orange-main">
                            <img src="/images/items/Elegant-Flower-Head-Art-.webp" alt="" class="w-24 h-24 mx-1 rounded-md hover:border-4 hover:border-orange-main">
                            <img src="/images/items/Elegant-Flower-Head-Art-.webp" alt="" class="w-24 h-24 mx-1 rounded-md hover:border-4 hover:border-orange-main">
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-full pt-5 flex flex-col justify-between py-10">
                    <div>
                        <h1 class="pt-5 text-3xl font-bold">I Fell in Love With Fall Because of You</h1>
                            <h3 class="pt-2 texp-sm font-light">Flower Head Wall Art by Frank Moth</h3>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Size:</p>
                            <a href="/" onclick="return false" class="w-auto h-auto border-2 border-orange-main px-4 py-2 rounded mx-2">24x36</a>
                            <a href="/" onclick="return false" class="w-auto h-auto border-white-main px-4 py-2 rounded mx-2 border-2 hover:border-orange-main">32x48</a>
                            <a href="/" onclick="return false" class="w-auto h-auto border-white-main px-4 py-2 rounded mx-2 border-2 hover:border-orange-main">40x60</a>
                            <a href="/" onclick="return false" class="w-auto h-auto border-white-main px-4 py-2 rounded mx-2 border-2 hover:border-orange-main">48x72</a>
                        </div>
                        <div class="w-full h-auto flex flex-nowrap my-5 items-center">
                            <p class="text-white-main">Frame Color:</p>
                            <div class="w-10 h-10 bg-white rounded-full mx-2 border-2 border-orange-main"></div>
                            <div class="w-10 h-10 bg-red-600 rounded-full mx-2 border-2 border-transparent hover:border-orange-main"></div>
                            <div class="w-10 h-10 bg-green-600 rounded-full mx-2 border-2 border-transparent hover:border-orange-main"></div>
                            <div class="w-10 h-10 bg-blue-600 rounded-full mx-2 border-2 border-transparent hover:border-orange-main"></div>
                        </div>
                    </div>
                    <div class="w-full h-auto flex flex-nowrap my-5 justify-end items-center">
                        <p class="text-xl font-serif">{{convertcurr(125)}}</p>
                        <a href="/" onclick="return false" class="text-xl font-serif mx-6 border border-orange-main px-5 py-2 rounded hover:bg-orange-main hover:text-black-main transition-all">Sepete Ekle</a>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>