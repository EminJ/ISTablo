<script setup>

</script>
<template>
    <div class="w-full h-screen bg-gray-background block text-white">
        <div class="w-full h-full flex flex-row flex-nowrap">
            <div class="w-1/2 h-screen flex flex-col items-center p-5">
                <div class="w-2/5 h-2/5 bg-white rounded focus:outline-none focus:shadow-gray-900 focus:shadow-md pl-2 text-black-main m-1">
                    <input type="file">
                </div>
                <input type="text" class="w-2/5 h-7 rounded focus:outline-none focus:shadow-gray-900 focus:shadow-md pl-2 text-black-main m-1" placeholder="Ürün Adı">
                <textarea class="w-2/5 h-14 rounded focus:outline-none focus:shadow-gray-900 focus:shadow-md pl-2 text-black-main m-1" placeholder="Ürün Açıklaması"></textarea>
               <div class="flex flex-nowrap w-2/5 justify-between">
                <input type="text" class="w-1/2 h-7 rounded focus:outline-none focus:shadow-gray-900 focus:shadow-md pl-2 text-black-main mr-1 my-1" placeholder="Ürün Üreticisi">
                <input type="number" class="w-1/2 h-7 rounded focus:outline-none focus:shadow-gray-900 focus:shadow-md pl-2 text-black-main mr-1 my-1" placeholder="Ürün Fiyatı (₺)">
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