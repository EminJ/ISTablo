<script setup>
    import UrunOlustur from "@/components/itemcreate.vue";
    import UrunOnay from "@/components/itemverify.vue";
    const urlbase = 'http://localhost:1000'
    const admincookie = useCookie('_admin')
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: '{"token":"'+admincookie.value+'"}'
    };
    try {
        const data = await fetch(urlbase+'/api/auth/usertested',options)
        .then((req)=> req.status)
        if(data != 200) navigateTo('/admin/panel')
    } catch (error) {}
    const prime=ref(0)
</script>

<template>
    <div>
        <div class="w-full h-16 mt-4 px-4 flex justify-start items-center">
            <a href="/" v-if="prime==0" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-emerald-400">Ürün Oluştur</a>
            <a href="/" v-if="prime!=0" @click="prime=0" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Ürün Oluştur</a>
            
            <a href="/" v-if="prime==1" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-emerald-400">Siparişler</a>
            <a href="/" v-if="prime!=1" @click="prime=1" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Siparişler</a>
  
            <!--<a href="/" v-if="prime==2" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-emerald-400">Yorumlar</a>
            <a href="/" v-if="prime!=2" @click="prime=2" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Yorumlar</a>-->

            <a href="/" v-if="prime==3" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-emerald-400">Kullanıcı Ayarları</a>
            <a href="/" v-if="prime!=3" @click="prime=3" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Kullanıcı Ayarları</a>

        </div>
        <div class="w-full h-auto px-4">
            <div v-show="prime==0"><UrunOlustur/></div>
            <div v-show="prime==1"><UrunOnay/></div>
            
        </div>
    </div>
</template>