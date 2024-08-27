<template>
    <div 
    class="dark:bg-zinc-800 z-30 xl:p-2 xl:my-auto fixed top-0 left-0 w-screen h-screen backdrop-blur-4xl bg-transparent overflow-y-auto">
        <!-- 移动端 -->
        <div 
        v-if="isMobile"
        class="w-full h-5 px-1 bg-white dark:bg-zinc-900 flex justify-between items-center"
        >
            <m-svg-icon
            @click="goBack"
            name="back"
            class="w-1.5 h-1.5"
            fillColor="fill-zinc-900 dark:fill-zinc-200"
            ></m-svg-icon>
            <m-svg-icon
            class="w-4 h-4 p-1 cursor-pointer"
            name="share"
            fillColor="fill-zinc-900 dark:fill-zinc-200"
            ></m-svg-icon>
        </div>
        <!-- 客户端 -->
        <m-svg-icon
        v-else
        @click="goBack"
        name="close"
        class="absolute top-2 right-2 w-3 h-3 p-0.5 cursor-pointer rounded-sm hover:bg-zinc-100 duration-200"
        fillColor="fill-zinc-400"
        ></m-svg-icon>
        <div class="border-1 border-zinc-500 xl:flex xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:bg-white xl:dark:bg-zinc-900">
            <div class="w-screen xl:w-3/5 xl:h-full mb-2">
                <img 
                class="w-full h-full xl:rounded-tl-lg xl:rounded-bl-lg"
                :src="data.photo">
            </div>
            <div class="xl:w-2/5 xl:h-full xl:p-3">
                <div v-if="!isMobile" class="flex justify-between mb-2">
                    <m-svg-icon
                    class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 duration-200 rounded"
                    name="share"
                    fillColor="fill-zinc-900 dark:fill-zinc-200"
                    ></m-svg-icon>
                    <button>
                        <m-svg-icon
                        class="w-3.5 h-3.5 p-1 bg-zinc-200 rounded hover:bg-zinc-400 duration-300"
                        name="heart"
                        ></m-svg-icon>
                    </button>
                </div>
                <p class="text-base text-zinc-900 dark:text-zinc-200 font-bold ml-1 xl:mb-5 xl:text-xl">{{ data.title }}</p>
                <div class="flex items-center mt-1 px-1">
                    <img v-lazy class="h-3 w-3 rounded-full" :src="data.avatar" alt="" />
                    <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ data.author }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getPhoto } from '@/api/pexels';
import { onMounted,ref } from 'vue';
import { isMobile } from '@/utils/flexible';
import { useRouter } from 'vue-router';

// 根据路径拿到id
const url = window.location.pathname.split('/')
const id = url[url.length - 1]

const data = ref({})
onMounted(() => {
    getPhoto(id).then((res) => {
        data.value = res
    })
})

const router = useRouter()
const goBack = () => {
    router.back()
}
</script>

<style lang="less" scoped>

</style>