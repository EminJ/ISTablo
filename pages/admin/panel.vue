<script setup>
    const alert = ref(['',false])
</script>
<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-1/4 h-auto border-2 border-slate-400 rounded-lg  px-4 p-1 transition-all hover:shadow-lg hover:shadow-gray-300">
            <p class="text-2xl text-gray-700 font-bold text-center m-4">Istanbul Tablo Admin Giriş</p>
            <input type="text" class="w-full h-10 my-2 text-center text-xl rounded text-gray-600 bg-gray-100 focus:outline-gray-400" placeholder="Kullanıcı Adı">
            <input type="password" class="w-full h-10 my-2 text-center text-xl rounded text-gray-600 bg-gray-100 focus:outline-gray-400" placeholder="Şifre Girişi">
            <div class="flex justify-end">
                <a href="/" @click="navigateTo='/'" class="w-auto h-auto py-2 px-8 text-gray-700 my-2 text-center text-lg font-bold rounded inline-block bg-gray-200 hover:bg-red-500 hover:text-white transition-all mx-2">Çıkış Yap</a>
                <a href="/" class="w-auto h-auto py-2 px-8 text-gray-700 my-2 text-center text-lg font-bold rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Giriş Yap</a>
            </div>
            <p v-if="alert[1]" class="w-full h-auto bg-red-500 rounded py-2 px-2 text-gray-100 mb-3 mt-1 flex justify-between">{{alert[0]}}<a href="/" onclick="return false" @click="alert[1]=false" class="bx bx-x flex items-center text-lg hover:text-gray-200 transition-all"></a></p>
        </div>
    </div>
</template>

