<script setup>
import { ref } from "vue";
let opentwopage = ref(false)
const open = (() => opentwopage.value = !opentwopage.value)
</script>
<script>
export default {
    data() {
        return {
            rotateX: 0,
            rotateY: 0,
        };
    },
    methods: {
        handleMouseMove(event) {
            const { offsetX, offsetY } = event;
            const { offsetWidth: width, offsetHeight: height } = this.$refs.box;
            this.rotateX = (-(offsetY - height / 2) / (height / 2)) * 6;
            this.rotateY = ((offsetX - width / 2) / (width / 2)) * 6;
        },
    },
};
</script>
<template>
    <div>
        <div class="w-full h-screen bg-gray-background block text-white">
            <div class="w-full h-full pt-32 flex flex-row flex-nowrap">

                <router-link to="items/4564564564564621231">
                    <div
                        class="w-64 h-96 rounded-md m-8 absolute shadow-md transition-all hover:shadow-black flex flex-col items-end justify-start"
                        v-on:mouseover="opentwopage = true" v-on:mouseleave="opentwopage = false">
                        <div class="w-auto h-24 z-10 absolute font text-white m-1 text-right">
                        </div>
                        <div ref="box" style="background: url('https://cdn.midjourney.com/c6d075cd-a5e8-4f0b-a3fe-8b8b54ddc872/grid_0_128_N.webp') no-repeat; background-size: cover;"
                            class="w-full h-full rounded-t-md" :style="{transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}"
                        @mousemove="handleMouseMove"></div>
                        <div v-on:mouseover="opentwopage=true" v-on:mouseleave="opentwopage=false" v-show="opentwopage"
                            class="w-full h-12 rounded-b-md transition-all flex items-center py-2 justify-between ">
                            <button href="/"
                                class="w-auto transition-all h-auto text-sm bg-gray-800 text-white inline-block p-1  px-6 rounded-sm hover:bg-green-700 mx-2">
                                Satın Al
                            </button>
                            <button href="/"
                                class="w-auto transition-all h-auto text-sm bg-gray-800 text-white inline-block p-1 px-6 rounded-sm hover:bg-green-500 mx-2">
                                Sepete Ekle
                            </button>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>