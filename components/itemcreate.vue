<script setup>
    import {ref} from 'vue'
    const cookie = useCookie('_admin')
    const urlbase = 'http://localhost:1000'

    const title = ref('')
    const explanation = ref('')
    const price = ref('')
    const tema = ref('')
    const pricebox = ref('')
    const color = ref('')
    const size = ref('')
    const sizebox = ref([])
    const category = ref([])
    const images = ref([])
    const colorbox = ref([])

    const alert = ref()

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

    function sendpost(){
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: '{"token":"'+cookie.value+'","title":"'+title.value+'","explanation":"'+explanation.value+'","category":"'+tema.value+'","type":"'+category.value+'","images":"'+images.value+'","size":"'+sizebox.value+'","color":"'+colorbox.value+'","price":"'+pricebox.value+'"}'
        };

        fetch(urlbase+'/api/store/frame/upload', options)
          .then(response => response.json())
          .then(response => alert.value={status:response.status,message:response.message})
          .catch(err => console.error(err));
    }

    function handleFileSelection( event ){
        console.log(event.target.files[0]);
        const form = new FormData();
        form.append("filename", event.target.files[0], event.target.files[0].name);
        const options = {
          method: 'POST'
        };

        options.body = form;

        fetch(urlbase+'/uploads', options)
          .then(response => response.json())
          .then(response => images.value.push(response.message))
          .catch(err => console.error(err));
    }
    const imagedel=((image)=> {
        const index = images.value.indexOf(image);
        if (index > -1) images.value.splice(index, 1);
    })
    function chooseFiles() {
        document.getElementById("fileUpload").click()
    }
</script>

<template>
    <div class="w-auto h-auto flex-col flex-nowrap">
        <div class="flex flex-nowrap">
            <div class="w-1/5 h-auto mr-4">
            <input type="text" v-model="title" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Ba??l??????">
            <textarea type="text" v-model="explanation" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n A????lamas??"></textarea>
            <span class="text-gray-500">??r??n Kategorisi</span>
            <select type="text" v-model="category" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Ba??l??????">
                <option value="Kanvas">Kanvas Tablo</option>
                <option value="Poster">Poster Tablo</option>
                <option value="Ya??l?? Boya">Ya??l?? Boya Tablo</option>
                <option value="Led Tablo">Led Tablo</option>
            </select>
            <span class="text-gray-500">??r??n Temas??</span>
            <select type="text" v-model="tema" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Ba??l??????">
                <option value="Manzara">Manzara</option>
                <option value="??i??ek">??i??ek</option>
                <option value="Dekoratif">Dekoratif</option>
                <option value="??ehir">??ehir</option>
                <option value="Hayvan">Hayvan</option>
                <option value="Foto??raf">Foto??raf</option>
            </select>
            </div>
            <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
                <input type="file" id="fileUpload" @change="handleFileSelection" hidden/>

                <template v-for="images in images">
                    <a href="/" onclick="return false" class="bg-transparent transition-all hover:bg-red-500 rounded-lg" @click="imagedel(images)"><div class="hover:bg-gray-500 hover:bg-opacity-40 transition-all w-32 h-32 rounded mt-1 bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white bg-cover" :style="{ backgroundImage: 'url(' + urlbase+'/images/'+images + ')' }"></div></a>
                </template>

                <a href="/" onclick="return false" @click="chooseFiles()"><div class="w-32 h-32 rounded mt-1 bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white">+</div></a>
            </div>
            <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
                <div class="w-full h-auto">
                    <div class="w-full flex">
                        <input type="text" v-model="size" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Boyutu Ekle">
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
                        <input type="text" v-model="color" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Rengi Ekle">
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
                        <input type="number" v-model="price" class="w-48 h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="??r??n Fiyat?? ???">
                        <a href="/" onclick="return false" @click="priceadd(price)" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Onayla</a>
                    </div>
                    <div>
                        <p v-if="pricebox" class="text-emerald-600 font-bold">??r??n Fiyat?? {{pricebox}}???</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <div v-if="alert && alert.status!=200" class="w-96 overflow-hidden h-12 bg-red-500 rounded-md ml-10 flex items-center p-2 text-white ">
                <i class="bx bxs-bell text-2xl mr-4"></i>
                <p>{{alert.message}}</p>
            </div>
            <div v-if="alert && alert.status==200" class="w-96 overflow-hidden h-12 bg-green-500 rounded-md ml-10 flex items-center p-2 text-white ">
                <i class="bx bxs-bell text-2xl mr-4"></i>
                <p>??r??n Onayland??!</p>
            </div>
            <a href="/" onclick="return false" @click="sendpost()" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2 mx-2">G??nder</a>
        </div>
    </div>
</template>