<script setup>
    import {ref} from 'vue'
    const cookie = useCookie('_admin')

    const title = ref()
    const explanation = ref()
    const price = ref()
    const tema = ref()
    const files = ref([])
    const pricebox = ref()
    const color = ref()
    const size = ref()
    const sizebox = ref([])
    const category = ref([])
    const images = ref([])
    const colorbox = ref([])

    const sizeadd=((size)=> sizebox.value.push(size))
    const coloradd=((color)=> colorbox.value.push(color))
    const colordel=((color)=> {
        const index = colorbox.value.indexOf(color);
        if (index > -1) colorbox.value.splice(index, 1);
    })
    const sizedel=((size)=> {
        const index = sizebox.value.indexOf(size);
        if (index > -1) sizebox.value.splice(index, 1);
    })
    const priceadd=((price)=> pricebox.value=price)


    //const options = {
    //  method: 'POST',
    //  headers: {
    //    cookie: 'connect.sid=s%253A9Ng-1YjZp-A-weA8Wu5CcfG7SJ9ZyESm.KsfoChCBZDmEGSqrFz2hb6lZ5clrZqHHOWAJnbUx%252Ffc',
    //    'Content-Type': 'application/json'
    //  },
    //  body: '{"token":"'+cookie.value+'","title":"'+cookie.value+'","explanation":"'+cookie.value+'","category":"'+cookie.value+'","type":"'+cookie.value+'","images":"'+cookie.value+'","size":"'+cookie.value+'","color":"'+cookie.value+'","price":'+cookie.value+'}'
    //};

    //fetch('http://localhost:1000/api/store/frame/upload', options)
    //  .then(response => response.json())
    //  .then(response => console.log(response))
    //  .catch(err => console.error(err));
    function handleFileSelection( event ){
        console.log(event.target.files[0]);
        const form = new FormData();
        form.append("filename", event.target.files[0], event.target.files[0].name);
        const options = {
          method: 'POST'
        };

        options.body = form;

        fetch('http://localhost:1000/uploads', options)
          .then(response => response.json())
          .then(response => console.log(response.message))
          .catch(err => console.error(err));
    }
</script>

<template>
    <div class="w-auto h-auto flex flex-nowrap">
        <div class="w-1/5 h-auto mr-4">
            <input type="text" v-model="title" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Başlığı">
            <textarea type="text" v-model="explanation" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Açılaması"></textarea>
            <span class="text-gray-500">Ürün Kategorisi</span>
            <select type="text" v-model="category" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Başlığı">
                <option value="kanvas">Kanvas Tablo</option>
                <option value="poster">Poster Tablo</option>
                <option value="poster">Yağlı Boya Tablo</option>
                <option value="poster">Led Tablo</option>
            </select>
            <span class="text-gray-500">Ürün Teması</span>
            <select type="text" v-model="tema" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Başlığı">
                <option value="kanvas">Manzara</option>
                <option value="poster">Çiçek</option>
                <option value="poster">Dekoratif</option>
                <option value="poster">Şehir</option>
                <option value="poster">Hayvan</option>
                <option value="poster">Fotoğraf</option>
            </select>
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <!--<div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white">+</div>-->
            <input type="file" multiple @change="handleFileSelection"/>
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full h-auto">
                <div class="w-full flex">
                    <input type="text" v-model="size" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Boyutu Ekle">
                    <a href="/" onclick="return false" @click="sizeadd(size)" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Ekle</a>
                </div>
                <template v-for="sizebox in sizebox">
                    <div class="px-4 py-2 bg-gray-200 rounded flex mr-2 mb-2 items-center justify-between">{{ sizebox }}<a href="/" onclick="return false" @click="sizedel(sizebox)" class="font-normal text-black-main hover:text-red-600">x</a></div>
                </template>
            </div> 
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full h-auto">
                <div class="w-full flex">
                    <input type="text" v-model="color" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Rengi Ekle">
                    <a href="/" onclick="return false" @click="coloradd(color)" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Ekle</a>
                </div>
                <template v-for="colorbox in colorbox">
                    <div class="px-4 py-2 bg-gray-200 rounded flex mr-2 mb-2 items-center justify-between"><div class="flex flex-nowrap"><div class="w-2 h-5 rounded-full bg-black mr-1" :style="{backgroundColor:colorbox}"></div> {{ colorbox }}</div> <a href="/" onclick="return false" @click="colordel(colorbox)" class="font-normal text-black-main hover:text-red-600">x</a></div>
                </template>
            </div>
        </div>
        <div class="w-1/6 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full flex flex-col">
                <div class="flex flex-nowrap">
                    <input type="number" v-model="price" class="w-48 h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Fiyatı ₺">
                    <a href="/" onclick="return false" @click="priceadd(price)" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Onayla</a>
                </div>
                <div>
                    <p v-if="pricebox" class="text-emerald-600 font-bold">Ürün Fiyatı {{pricebox}}₺</p>
                </div>
            </div>
        </div>
    </div>
</template>