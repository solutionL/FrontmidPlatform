<template>
    <div class="w-full">
        <div class="flex items-center text-sm text-zinc-400">
            <span>最近搜索</span>
            <m-svg-icon
            name="delete"
            class="w-2.5 h-2.5 p-0.5 m-0.5 cursor-pointer hover:bg-zinc-100 rounded-sm"
            fillColor="fill-zinc-400"
            @click="deleteAllHistory"
            />
        </div>
        <div class="flex flex-wrap">
            <button 
            v-for="item,index of history" :key="index"
            class="flex items-center px-1 py-0.5 mr-1 mb-1 font-bold bg-zinc-100 hover:bg-zinc-200 rounded-sm duration-200"
            @click="selectItem(item)"
            >
                <span>{{ item }}</span>
                <!-- 删除 需阻止事件向上冒泡 -->
                <m-svg-icon 
                name="input-delete"
                class="w-2.5 h-2.5 ml-2 p-0.5"
                @click.stop="deleteItem(index)"
                />
            </button>
        </div>
    </div>
</template>

<script>
const EMIT_SELECTITEM = 'selectItem'
</script>

<script setup>
import { useSearchStore } from '@/store/index'
import { storeToRefs } from 'pinia';

const store = useSearchStore()
const { history } = storeToRefs(store)
// 删除所有历史记录
const deleteAllHistory = () => {
    history.value = []
}
// 删除单个历史记录
const deleteItem = (index) => {
    history.value.splice(index,1)
}

const emits = defineEmits([EMIT_SELECTITEM])
const selectItem = (item) => {
    emits(EMIT_SELECTITEM,item)
}
</script>

<style lang="less" scoped>

</style>