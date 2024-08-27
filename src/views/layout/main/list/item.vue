<template>
    <div 
    class="rounded"
    @click="showDetail"
    >
        <div class="relative rounded cursor-zoom-in group">
            <!-- 图片宽高等比 -->
            <img 
            ref="imgRef"
            v-lazy
            class="w-full rounded bg-transparent"
            :src="data.photo"
            :style="{height: width / data.photoWidth * data.photoHeight + 'px'}"
            >
            <!-- 遮罩层 -->
            <div class="hidden opacity-0 xl:block group-hover:opacity-100 w-full h-full rounded absolute top-0 left-0 duration-300 bg-zinc-900/50">
                <el-button 
                class="absolute top-1.5 left-1.5 text-base"
                type="danger"
                @click.stop=""
                >分享</el-button>

                <button class="absolute top-1.5 right-1.5">
                    <m-svg-icon
                    class="w-3.5 h-3.5 p-1 bg-zinc-100 rounded hover:bg-zinc-400 duration-300"
                    name="heart"
                    @click.stop=""
                    ></m-svg-icon>
                </button>
                <button class="absolute bottom-1.5 left-1.5">
                    <m-svg-icon
                    class="w-3 h-3 p-0.5 bg-zinc-100 rounded hover:bg-zinc-400 duration-300"
                    name="download"
                    @click.stop="onDownload"
                    ></m-svg-icon> 
                </button>
                <button class="absolute bottom-1.5 right-1.5">
                    <m-svg-icon
                    class="w-3 h-3 p-0.5 bg-zinc-100 rounded hover:bg-zinc-400 duration-300"
                    name="full"
                    @click.stop="imgFull"
                    ></m-svg-icon>
                </button>
            </div>
        </div>
        <!-- 标题 -->
        <span class="text-sm mt-1 px-1 text-zinc-900 dark:text-zinc-300 font-bold line-clamp-1">{{ data.title }}</span>
        <!-- 作者 -->
        <div class="p-1 flex items-center">
            <img v-lazy class="w-2 rounded-full mr-1" :src="data.avatar">
            <span class="text-sm text-zinc-500 line-clamp-1">{{ data.author }}</span>
        </div>
    </div>
</template>

<script setup>
import { useElementBounding, useFullscreen } from '@vueuse/core';
import { computed, ref } from 'vue';
import { saveAs } from 'file-saver';

const props = defineProps({
    data:{
        type:Object,
        require:true
    },
    width:{
        type:Number,
    }
})

const emits = defineEmits(['click'])

// 进入详情界面 
const showDetail = () => {
    // 返回当前图片的id和中心位置
    emits('click',{id:props.data.id,imgCenter:imgCenter.value})
}

const imgRef = ref(null)
// 全屏显示图片
const { enter:imgFull } = useFullscreen(imgRef)

// 解构x,y,width,height属性并赋值给imgX...
const {x:imgX,y:imgY,width:imgWidth,height:imgHeight} = useElementBounding(imgRef)
const imgCenter = computed(() => {
    return {
        centerX:parseInt(imgX.value+imgWidth.value/2),
        centerY:parseInt(imgY.value+imgHeight.value/2)
    }
})

// 下载
const onDownload = () => {
    setTimeout(() => {
        saveAs(props.data.photoDownLink)
    },100)
}
</script>

<style lang="less" scoped>

</style>