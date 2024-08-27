<template>
    <div>
        <!-- 图片展示 -->
        <slot></slot>
        <!-- 加载效果 -->
        <div 
        ref="loadTarget"
        class="text-center h-6 py-4">
            <!-- 加载图片 -->
            <m-svg-icon 
            v-show="isLoad"
            name="infinite-load"
            class="w-4 h-4 mx-auto animate-spin duration-500"
            >
            </m-svg-icon>
            <!-- 图片没有了 -->
            <span 
            class="text-base text-zinc-400"
            v-show="isEnd"
            >已经没有更多数据了!</span>
        </div>
    </div>
</template>

<script>
// 加载图片事件
const EMIT_LOAD = 'load'
</script>

<script setup>
import { defineEmits } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { ref,watch } from 'vue';

const props = defineProps({
    // 数据是否加载完毕
    isEnd:{
        type:Boolean,
        default:false
    }
})

const emits = defineEmits([EMIT_LOAD])

// 加载div
const loadTarget = ref(null)
// 是否到了视口范围中
const isLoad = ref(true)
useIntersectionObserver(loadTarget,([{ isIntersecting }]) => {
    // 首次加载时 因为图片懒加载 所以load会先出现在视口中 isIntersecting先为true 后为false
    // 所以使用firstLoad达到首次变化不请求加载后续的图片
    isLoad.value = isIntersecting
})

let firstLoad = true
watch(isLoad,(newValue) => {
    // 首次变化不加载图片
    if(firstLoad){
        firstLoad = false
        return
    }
    if(newValue){
        // 间隔1s触发加载事件
        setTimeout(() => {
            // 触发加载事件
            emits(EMIT_LOAD)
        }, 100);
    }
})
</script>

<style lang="less" scoped>

</style>