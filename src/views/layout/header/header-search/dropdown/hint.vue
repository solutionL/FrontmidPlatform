<template>
    <div>
        <div
        v-for="text of hintData"
        class="p-1 text-base text-zinc-500 font-bold cursor-pointer hover:bg-zinc-200 rounded duration-300"
        v-html="showText(text)"
        @click="clickText(text)"
        >
        </div>
    </div>
</template>

<script>
// 点击提示事件
const EMIT_CLICKTEXT = 'clickText'
</script>


<script setup>
import { getHint } from '@/api/pexels';
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

const props = defineProps({
    inputValue:{
        type:String,
        required:true
    }
})

// 搜索提示数据 需进行防抖处理 处理频繁变化的值
const hintData = ref([])
watchDebounced(()=>props.inputValue,(newValue) => {
    if(!newValue) return
    getHint(newValue).then((data) => {
        hintData.value = data.result
    })
},{debounce:500})

function showText(text){
    // 高亮标签
    let highLight = `<span class="text-zinc-900">${props.inputValue}</span>`
    // 将用户输入部分替换为高亮
    return text.replace(props.inputValue,highLight)
}

const emits = defineEmits([EMIT_CLICKTEXT])

const clickText = (text) => {
    emits(EMIT_CLICKTEXT,text)
}

</script>

<style lang="less" scoped>

</style>