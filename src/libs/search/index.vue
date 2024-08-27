<template>
    <div class="relative z-10">
        <div ref="search" class="relative w-full p-0.5 group flex items-center border-white rounded-xl hover:bg-red-100/40 duration-500">
             <!-- 搜索图标 -->
            <m-svg-icon
            class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] mx-1.5"
            name="search"
            color="#707070"
            />
            <!-- 输入框 -->
            <input 
            @keyup.enter = "searchHandler"
            @focus = "focusHandler(true)"
            @blur = "focusHandler(false)"
            type="text" 
            placeholder="搜索"
            v-model="inputValue"
            class="dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-800 w-full h-[44px] bg-zinc-100 caret-zinc-400 text-sm text-zinc-900 font-semibold outline-0 border border-zinc-100 rounded-xl pl-4 focus:border-red-300 duration-500  group-hover:bg-white dark:group-hover:bg-zinc-800">
            <!-- 删除图标 -->
            <m-svg-icon
            @click="deleteValue"
            v-show="inputValue"
            class="w-2 h-2 absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer duration:500"
            name="input-delete"
            />
            <!-- 搜索按钮 -->
            <el-button 
            v-show="inputValue" 
            @click="searchHandler"
            class="absolute top-[50%] right-1 translate-y-[-50%]" 
            type="danger" 
            :icon="'Search'" 
            circle 
            />
        </div>
        <!-- 下拉框 -->
        <!-- transition专用于管理元素的进入和离开 -->
        <transition name="slide">
            <div
            v-if="$slots.dropdown"
            v-show="isFocus"
            class="dark:bg-zinc-800 absolute left-0 top-6 p-2 w-full max-h-[368px] overflow-auto scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent text-sm rounded bg-white border border-zinc-200 duration-200"
            >
                <!-- 渲染父组件的内容 -->
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
// 搜索事件
const EMIT_SEARCH = 'search'
// 删除文本事件
const EMIT_CLEAR = 'clear'
// 更新事件
const EMIT_UPTATE_VALUE = 'update:modelValue'
</script>

<script setup>
// 组件内部利用defineProps和useVModel 可以方便地实现与inputValue变量的双向绑定 保持数据同步
import { useVModel,onClickOutside  } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
    // 实现父子组件的双向绑定
    modelValue:{
        type:String,
        required:true
    }
})

const emits = defineEmits([
    EMIT_UPTATE_VALUE,
    EMIT_CLEAR,
    EMIT_SEARCH
])

// 与父组件实现双向数据绑定
let inputValue = useVModel(props,'modelValue')

// 删除输入框文本
const deleteValue = () => {
    inputValue.value = ''
    // 这里失去焦点了 会影响提示的下拉框的出现 需重新获得焦点 onClickOutside来失去焦点
    isFocus.value = true
    emits(EMIT_CLEAR,'')
}

// 检测到鼠标点击事件发生在组件外部时触发
const search = ref(null)
onClickOutside(search, () => {
    isFocus.value = false
})

// 焦点
const isFocus = ref(false)
const focusHandler = (flag) => {
    isFocus.value = flag
}

// 父绑定函数 子触发事件
// 搜索
const searchHandler = () => {
    // 触发search事件 同时向父组件传值
    emits(EMIT_SEARCH,inputValue.value)
}
</script>

<style lang="less" scoped>
.slide-enter-active,.slide-leave-active{
    transition: all 0.5s;
}

.slide-enter-from,.slide-leave-to{
    transform: translateY(40px);
    opacity: 0;
}

</style>