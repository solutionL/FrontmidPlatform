<template>
    <div>
        <div class="mb-0.5 text-zinc-400" >
            <span>热门精选</span>
        </div>
        <div class="flex h-[140px] mr-1">
            <div class="relative w-[260px] mr-1 rounded cursor-pointer">
                <img 
                :src="themeData.big.photo"
                class="w-full h-full object-cover rounded"
                >
                <span class="absolute left-0 bottom-2 ml-1 text-white text-xs"> # {{ themeData.big.title }}</span>
            </div>
            <!-- flex-1填充剩余空间 不挤压其他元素 -->
            <div class="flex-1 flex flex-wrap">
                <div v-for="item of themeData.list" class="relative h-[45%] mr-1 mb-1 cursor-pointer">
                    <img 
                    :src="item.photo"
                    class="w-[260px] h-full object-cover rounded"
                    >
                    <span class="absolute left-0 bottom-2 ml-1 text-white text-xs"> # {{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getTheme } from '@/api/pexels';
import { onMounted, reactive } from 'vue';

let themeData = reactive({
    big:{},
    list:[]
})

onMounted(() => {
    getTheme().then((data) => {
        const themes = data.themes
        themeData.big = themes[0]
        // 去除第一个元素
        themeData.list = themes.splice(1)
    })
})
</script>

<style lang="less" scoped>

</style>