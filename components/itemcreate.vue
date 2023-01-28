<template>
    <div class="w-auto h-auto flex flex-nowrap">
        <div class="w-1/5 h-auto mr-4">
            <input type="text" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Başlığı">
            <textarea type="text" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Açılaması"></textarea>
            <select type="text" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Başlığı">
                <option>Ürün Kategorisi</option>
                <option value="kanvas">Kanvas Tablo</option>
                <option value="poster">Poster Tablo</option>
            </select>
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white"></div>
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white"></div>
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white"></div>
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white"></div>
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white"></div>
            <div class="w-24 h-24 rounded bg-slate-300 flex justify-center items-center text-xl mx-2 mb-2 text-white">+</div>
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full h-auto">
                <div class="w-full flex">
                    <input type="text" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Boyutu Ekle">
                    <a href="/" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Ekle</a>
                </div>
                <div class="px-4 py-2 bg-gray-200 rounded inline-block mr-2 mb-2">24x36</div>
            </div> 
        </div>
        <div class="w-1/5 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full h-auto">
                <div class="w-full flex">
                    <input type="text" class="w-full h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Rengi Ekle">
                    <a href="/" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Ekle</a>
                </div>
                <div class="px-4 py-2 bg-gray-200 rounded flex mr-2 mb-2 items-center"><div class="w-2 h-5 rounded-full bg-black mr-1"></div> black</div>
                <div class="px-4 py-2 bg-gray-200 rounded flex mr-2 mb-2 items-center"><div class="w-2 h-5 rounded-full bg-red-600 mr-1"></div> red</div>
            </div>
        </div>
        <div class="w-1/6 h-auto mr-4 flex content-start flex-wrap">
            <div class="w-full flex">
                <input type="number" class="w-48 h-10 my-2 pl-1 rounded bg-gray-100 text-gray-600 focus:outline-gray-400" placeholder="Ürün Fiyatı ₺">
                <a href="/" class="w-auto h-auto py-1 px-4 text-gray-700 my-2 text-center text-lg rounded inline-block bg-gray-200 hover:bg-green-600 hover:text-white transition-all ml-2">Onayla</a>
            </div>
        </div>
    </div>
</template>