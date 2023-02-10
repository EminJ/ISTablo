<template>
  <div class="flex flex-nowrap">
    <div class="w-1/2 h-auto">
        <p class="border-b-2 border-b-green-600 text-center text-xl pb-1 mr-5">Gelen Siparişler</p>
        <div class="w-full h-auto  mr-5 mt-5">

            <!-- urun -->

            <div class="w-11/12 h-auto bg-gray-200 rounded my-1 mb-3 flex flex-col flex-nowrap m-auto">
                <div class="flex flex-nowrap">
                    <!-- Sepet Yan 1. Kısım -->
                    <div class="w-3/4 h-20 flex flex-nowrap text-black-main items-center">
                      <img src="/images/items/Elegant-Flower-Head-Art.webp" class="h-full p-1 rounded-lg">
                      <div class="w-auto h-full bg-slate-400"></div>
                      <div class="flex flex-col">
                        <p class="w-full h-6 overflow-hidden text-black-main">Tablo Adı <span class="text-gray-primary text-xs overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam exercitationem voluptatem dolor perspiciatis ducimus, voluptatibus nisi quibusdam corrupti tempore rerum vitae architecto et impedit eum, laudantium, labore fugit cum iste.</span></p>
                        <p class="text-xs text-gray-primary">Boyut/Ebat 100 x 70, Tablo Rengi Siyah</p>
                      </div>
                    </div>
                    <!-- Sepet Yan 2. Kısım -->
                    <div class="w-1/4 h-auto flex flex-nowrap items-center justify-between pr-5">
                      <p class="text-yellow-600">300,00 TL</p>
                      <div class="w-2/4 h-full mt-5 text-sm text-black-main">
                          <p>Kullanıcı Adı-Soy Adı</p>
                          <p>1 Tane Satın Aldı</p>
                          <p>Tarih</p>
                      </div>
                    </div>
                </div>
                <div class="flex justify-between mb-2 mt-2">
                    <div class="w-2/4 text-sm text-gray-600 ml-1">
                        Adres Bilgisi, Kullanıcı Bilgisi
                    </div>
                    <div>
                        <a href="/" class="w-auto h-auto py-2 mx-2 px-4 text-white-main my-2 text-center text-base rounded inline-block bg-orange-600 hover:bg-orange-500 hover:text-white transition-all ml-2">Sipariş Dekontu</a>
                        <a href="/" class="w-auto h-auto py-2 mx-2 px-4 text-white-main my-2 text-center text-base rounded inline-block bg-red-600 hover:bg-red-500 hover:text-white transition-all ml-2">Siparişi İptal Et</a>
                        <a href="/" class="w-auto h-auto py-2 mx-2 px-4 text-white-main my-2 text-center text-base rounded inline-block bg-green-600 hover:bg-green-500 hover:text-white transition-all ml-2">Siparişi Onayla</a>
                    </div>
                </div>
            </div>

            <!-- urun -->

        </div>
    </div>
    <div class="w-1/2 h-auto">
        <p class="border-b-2 border-b-green-900 text-center text-xl pb-1 ml-5">Geçmiş Siparişler</p>
        <div class="w-full h-auto ml-5 mt-5">
            <div class="w-11/12 h-20 bg-gray-100 rounded my-1 flex flex-nowrap m-auto">
              <!-- Sepet Yan 1. Kısım -->
              <div class="w-3/4 h-20 flex flex-nowrap text-black-main items-center">
                <img src="/images/items/Elegant-Flower-Head-Art.webp" class="h-full p-1 rounded-lg">
                <div class="w-auto h-full bg-slate-400"></div>
                <div class="flex flex-col">
                  <p class="w-full h-6 overflow-hidden text-black-main">Tablo Adı <span class="text-gray-primary text-xs overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam exercitationem voluptatem dolor perspiciatis ducimus, voluptatibus nisi quibusdam corrupti tempore rerum vitae architecto et impedit eum, laudantium, labore fugit cum iste.</span></p>
                  <p class="text-xs text-gray-primary">Boyut/Ebat 100 x 70, Tablo Rengi Siyah</p>
                </div>
              </div>
              <!-- Sepet Yan 2. Kısım -->
              <div class="w-1/4 h-auto flex flex-nowrap items-center justify-between pr-5">
                <p class="text-yellow-600">300,00 TL</p>
                <div class="w-2/4 h-full mt-5 text-sm text-black-main">
                    <p>Kullanıcı Adı-Soy Adı</p>
                    <p>1 Tane Satın Aldı</p>
                    <p>Tarih</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
</template>