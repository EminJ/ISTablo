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
        fetch(urlbase+'/api/auth/usertested',options)
        .then((req)=> {
          if(req.status!=200) navigateTo('/admin/panel')
        })
    } catch (error) {}
</script>

<template>
    <div>
        <div class="w-full h-16 mt-4 px-4 flex justify-start items-center">
            <a href="/" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-emerald-400">Siparişler</a>
            <a href="/" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Ürün Oluştur</a>
            <a href="/" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Yorumlar</a>
            <a href="/" onclick="return false" class="border-b-2 px-2 text-lg mr-2 border-b-transparent hover:border-b-emerald-400">Kullanıcı Ayarları</a>
        </div>
        <div class="w-full h-auto px-4">
            <UrunOlustur/>
        </div>
    </div>
</template>