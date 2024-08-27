<template>
    <el-popover
        placement="bottom"
        trigger="hover"
        :effect="themeType"
    >
        <template #reference>
            <m-svg-icon 
            :name="themeIcon"
            class="w-4 h-4 p-1 outline-0 mr-1 cursor-pointer hover:bg-zinc-100 rounded
                    dark:hover:bg-black"
            fillColor="dark:fill-zinc-100"
            />
        </template>
        <template #default>
            <div class="flex flex-col">
                <button 
                @click="changeTheme(item)" 
                v-for="item of theme" 
                class="flex justify-center p-1 hover:bg-zinc-100 rounded-full
                        dark:hover:bg-zinc-800">
                    <m-svg-icon 
                    :name="item.icon"
                    class="w-2 h-2 mr-1"
                    fillColor="dark:fill-zinc-100"
                    />
                    <span>{{ item.name }}</span>
                </button>
            </div>
        </template>
    </el-popover>
</template>

<script setup>
import { theme } from '@/constants';
import { useThemeStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useThemeStore()
// 改变主题
const html = document.querySelector('html')
const { themeType } = storeToRefs(store)
const changeTheme = (item) => {
    themeType.value = item.type
    html.className = themeType.value
}

// 切换主题后改变icon
const themeIcon = computed(() => {
    return theme.find((item) => {
        return item.type === themeType.value
    }).icon
})

</script>

<style lang="less" scoped>

</style>