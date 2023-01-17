<script setup>
import { ref } from "vue";
</script>

<template>
    <div>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
                <div class="w-80 h-110 bg-black-main rounded-md m-12 transition-all shadow-md hover:shadow-gray-900">
                    <div class="w-full h-80 bg-orange-100 rounded-t-md" style="background: url('/images/items/Elegant-Flower-Head-Art.webp') no-repeat; background-size: contain;">
                        </div>
                    <div class="w-full h-10 flex justify-center items-center text-white">
                        <NuxtLink to="items/4564564564564621231">
                            <p class="transition-all hover:text-blue-700 font-bold text-2xl">Sun Sprayed</p>
                        </NuxtLink>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center">
                        <p class="font-light text-gray-600">Thomas Fotomas</p>
                    </div>
                    <div class="w-full h-8 flex justify-center items-center rounded-b-md">
                        <p class="font-bold text-xs text-gray-400">From: $125.00</p>
                        
                    </div>
                </div>
                <p class="text-white">{{ currentPokemon }}</p>
            </div>
        </div>
        
    </div>
</template>