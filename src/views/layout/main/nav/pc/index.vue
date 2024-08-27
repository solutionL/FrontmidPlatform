<template>
    <div class="w-full z-10 sticky top-0 left-0 bg-white dark:bg-zinc-800 duration-500">
        <ul 
        :class="isOpen?'h-[206px]':'h-[56px]'"
        class="w-[800px] mx-auto px-1 py-0.5 relative flex flex-wrap justify-center items-center overflow-x-auto overflow-hidden duration-300">
            <li 
            v-for="item of category" :key="item.id"
            class="mr-1 mb-1 last:mr-4 hover:bg-zinc-200 duration-200 text-base font-bold text-zinc-900 dark:text-zinc-500 px-1.5 py-1 rounded cursor-pointer"
            @click="clickItem(item.id)"
            :class="{'bg-zinc-200 dark:bg-zinc-900':item.id === now}"
            >
                {{ item.name }}
            </li>
            <m-svg-icon
            @click="changeOpenState"
            :name="isOpen?'fold':'unfold'"
            class="absolute bottom-1.5 right-0 w-3 h-3 p-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded duration-200"
            fillColor="fill-zinc-900 dark:fill-zinc-500"
            ></m-svg-icon>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCategoryStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { getCategory } from '@/api/category';
import { ALL_CATEGORY } from '@/constants'


const isOpen = ref(false)
const store = useCategoryStore()
const { category,now } = storeToRefs(store)

const changeOpenState = () => {
    isOpen.value = !isOpen.value
}

const clickItem = (index) => {
    now.value = index
}

onMounted(() => {
    getCategory().then((data) => {
        // ...展开
        category.value = [ALL_CATEGORY,...data.categorys]
    })    
})

</script>

<style lang="less" scoped>

</style>