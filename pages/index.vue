<script setup>
import Navbar from "./Navbar.vue";
let arr = ref(0);
let primepics = ref([
  {
    resim: "/images/content_pictures/sadeceyupp_primitive_tribe_camping_in_the_wilderness_in_the_sno_857d216e-9b00-42ae-a07e-ba6cc42bb812.png",
    baslik: "Terk Edilmiş Çadırlar",
    aciklama: "Mavi-sarı renkte 10-20 arası çadır, karlı bir alanda terk edilmiş görünüyor.",
    detay: "Tablonun merkezinde, karlı bir alanda yer alan mavi-sarı renkte çadırlar görülüyor. Çadırların sayısının 10 ile 20 arasında olduğu tahmin ediliyor. Çadırların içi boş ve terk edilmiş gibi görünüyor. Belki de bu çadırlar, bir turizm etkinliği sırasında kullanılmış ve sonrasında terk edilmiş olabilir. Karlı bir alanda bulunmaları, bu etkinliklerin daha önce gerçekleştiğini düşündürüyor. Tablonun çevresinde, karlı arazi ve ağaçlar görülüyor. Hava soğuk ve bulutlu görünüyor."
  },
  {
    resim: "/images/content_pictures/afafaf_in_the_style_of_rick_and_morty_book_cover_of_a_deserted__271dbb0d-5282-4f49-a547-74d9a5e3b59f.png",
    baslik: "Tek Başına Kumsal Sahilde Yürüyen Adam",
    aciklama: "Terk edilmiş bir adada tek başına yürüyen bir adam görülüyor.",
    detay: "Tablonun merkezinde, terk edilmiş bir adada tek başına yürüyen bir adam görülüyor. Adam, adanın kumsal sahilinde yürüyor ve gözüne ulaşabileceği her yere bakıyor. Belki de bu adam, adada kaybolan veya tesadüfen adaya düşmüş bir yolcudur. Adanın çevresinde, açık mavi renkli bir deniz ve beyaz kumlar görülüyor. Hava güneşli ve sıcak görünüyor. Adamın yüz ifadesi, endişe ve kaygı ile dolu görünüyor. Belki de adada tek başına kalmayı kabullenememiş ve kurtulmaya çalışıyordur."
  },
  {
    resim: "/images/content_pictures/asab_two_men_in_worn_clothes_sitting_on_the_beach_on_the_island_e97b274c-4ecc-45d0-a4f7-29a68d19d4e3.png",
    baslik: "Ateşin Başında Adada Denizi Seyreden İki Adam",
    aciklama: "Bir adada iki adam, ateşin başında denizi seyrediyorlar.",
    detay: "Tablonun merkezinde, bir adada iki adam görülüyor. Adamlar, ateşin başında yüksekçe bir yerden denizi seyrediyorlar. Adamların yüz ifadeleri, mutluluk ve huzur ile dolu görünüyor. Belki de bu adamlar, yorgunluktan ve stresinden uzaklaşmak için bu adaya kaçmış ve orada bir süre kalmayı planlamışlardır. Adanın çevresinde, açık mavi renkli bir deniz ve verimli yeşil arazi görülüyor. Ateşin ışığı, adamların yüzlerini aydınlatıyor ve onların yüz ifadelerinde güzel bir ışık yansıması oluşturuyor. Hava güneşli ve sıcak görünüyor."
  },
  {
    resim: "/images/content_pictures/sko_white_horses_running_on_the_island_realistick_8k_da72afd9-a576-4fb1-8b67-8134c187326d.png",
    baslik: "Bembeyaz Atlar Koşuyor",
    aciklama: "Dört tane bembeyaz at, koşarken görülüyor.",
    detay: "Tablonun merkezinde, dört tane bembeyaz at görülüyor. Atlar, hızlı koşarken görülüyor ve onların koşuşlarından güçlü ve enerjik oldukları anlaşılıyor. Atların çevresinde, açık mavi renkli bir deniz ve yeşil arazi görülüyor. Belki de bu atlar, bir yarış sırasında koşuyor ve yarışı kazanmak için tüm enerjilerini harcıyorlar. Atların bembeyaz tüyleri, güzel bir ışık yansıması oluşturuyor ve onların güçlü vücutlarını ortaya çıkarıyor. Hava güneşli ve sıcak görünüyor."
  },
  {
    resim: "/images/content_pictures/Arda_underwater_city_-_survival_7dabceda-8e63-4b26-afda-2526fb95e23d.png",
    baslik: "Denizin Altında Gömülmüş Şehir",
    aciklama: "Denizin altında, dağılmış bir şehir görülüyor.",
    detay: "Tablonun merkezinde, denizin altında gömülmüş ve dağılmış bir şehir görülüyor. Şehir, eski zamanlarda yaşamış insanlar tarafından kurulmuş olmalı ve zamanla denizin suları tarafından yutulmuş. Şehir, antik yapılarının yanı sıra, eski sokakları ve meydanları ile de görülebilen bir yerdir. Şehrin çevresinde, mavi renkli bir deniz ve beyaz kumlar görülüyor. Belki de bu şehir, bir felaket sonucu yok olmuş ve zamanla denizin suları tarafından tamamen yutulmuştur. Hava güneşli ve sıcak görünüyor ve denizin dalgaları, şehir üzerinde hafifçe sallanıyor."
  }
])
const change = () => {
  if (primepics.value[arr.value + 1]) arr.value++
  else arr.value = 0
}
</script>

<template>
  <div>
    <div class="w-full h-screen bg-gray-background block text-white">
      <Navbar />
      <div class="w-full h-full pt-32 flex flex-row flex-nowrap">
        <div v-if="primepics[arr + 1]" class="w-1/3 h-full text-white-main p-10">
          <h1 class="text-4xl font-bold my-7">{{ primepics[arr + 1].baslik }}</h1>
          <hr>
          <p class="text-3xl font-light mt-6 mb-7">{{ primepics[arr + 1].aciklama }}</p>
          <p class="text-xl font-extralight italic">“ {{ primepics[arr + 1].detay }} ”</p>
          <p class="my-16">
            <button href="/"
              class="w-auto transition-all h-auto bg-orange-main text-white-main font-bold inline-block p-2 px-8 rounded-sm hover:bg-black-main mr-5">Satın
              Al</button>
            <button href="/"
              class="w-auto transition-all h-auto bg-slate-500 text-white-main font-bold inline-block p-2 px-8 rounded-sm hover:bg-black-main">Sepete
              Ekle</button>
          </p>
        </div>
        <div v-else class="w-1/3 h-full text-white-main p-10">
          <h1 class="text-4xl font-bold my-7">{{ primepics[0].baslik }}</h1>
          <hr>
          <p class="text-3xl font-light mt-6 mb-7">{{ primepics[0].aciklama }}</p>
          <p class="text-xl font-extralight italic">“ {{ primepics[0].detay }} ”</p>
          <p class="my-16">
            <button href="/"
              class="w-auto transition-all h-auto bg-orange-main text-white-main font-bold inline-block p-2 px-8 rounded-sm hover:bg-black-main mr-5">Satın
              Al</button>
            <button href="/"
              class="w-auto transition-all h-auto bg-slate-500 text-white-main font-bold inline-block p-2 px-8 rounded-sm hover:bg-black-main">Sepete
              Ekle</button>
          </p>
        </div>
        <div class="w-8/12 h-full flex justify-end items-center">
          <div class="w-full h-5/6 rounded-sm shadow-lg shadow-black flex justify-end items-center bg-cover"
            :style="{ background: `url(${primepics[arr].resim}) no-repeat`, backgroundSize: `cover` }">
            <div v-if="primepics[arr - 1]" ref="box"
              class="transition-opacity w-98 h-full rounded-sm shadow-lg shadow-black bg-cover"
              :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, background: `url(${primepics[arr - 1].resim})`, backgroundSize: `cover` }"
              @mousemove="handleMouseMove">
              <div class="w-full h-full flex justify-end items-end flex-col p-8">
                <button class="text-5xl font-extrabold hover:text-white-main" @click="change">&raquo;</button>
              </div>
            </div>
            <div v-else ref="box" class="transition-opacity w-98 h-full rounded-sm shadow-lg shadow-black bg-cover"
              :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, background: `url(${primepics[primepics.length - 1].resim})`, backgroundSize: `cover` }"
              @mousemove="handleMouseMove">
              <div class="w-full h-full flex justify-end items-end flex-col p-8">
                <button class="text-5xl font-extrabold hover:text-white-main" @click="change">&raquo;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rotateX: 0,
      rotateY: 0
    };
  },
  methods: {
    handleMouseMove(event) {
      const { offsetX, offsetY } = event;
      const { offsetWidth: width, offsetHeight: height } = this.$refs.box;
      this.rotateX = -(offsetY - height / 2) / (height / 2) * 4.25;
      this.rotateY = (offsetX - width / 2) / (width / 2) * 4.25;
    }
  }
};
</script>

