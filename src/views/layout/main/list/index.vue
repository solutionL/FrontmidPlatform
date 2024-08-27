<template>
    <div>
        <!-- 图片懒加载效果 -->
        <m-infinite-list
        :isEnd="isEnd"
        @load="getPexelsData"
        >
            <!-- 图片流 -->
            <m-waterfall
            ref="waterfull"
            :list="list"
            :column="isMobile ? 2 : 5"
            >
                <!-- 解构插槽传递的对象 -->
                <template v-slot="{ item, width }">
                    <itemVue :data="item" :width="width" @click="toPins"></itemVue>
                </template>
            </m-waterfall>
        </m-infinite-list>
        <!-- 大图详情页 关闭过渡效果的默认样式 -->
        <transition
        :css="false"
        @beforeEnter="beforeEnter"
        @enter="enter"
        @leave="leave"
        >
            <pin v-if="isVisible" :id="currentPin.id"></pin>
        </transition>
    </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels';
import { onMounted, reactive,ref,onUnmounted, watch } from 'vue';
import { isMobile } from '@/utils/flexible';
import itemVue from './item.vue';
import { useEventListener } from '@vueuse/core';
import pin from '@/views/layout/pins/index.vue'
import gsap from 'gsap' //js动画库
import { useCategoryStore } from '@/store/index';
import { useSearchStore } from '@/store/index';
import pinia from '@/store';

// 数据请求
let query = reactive({
    page:1,
    size:20
})


onMounted(() => {
    getPexelsData()
})

// 是否都完成了
const isEnd = ref(false)

const list = ref([])
// 分页获取数据
const getPexelsData = async () => {
    // 不是第一次获取数据
    if(list.value.length>0){
        query.page += 1
    }

    const res = await getPexelsList(query)
    if(query.page === 1){
        // 第一次获取数据
        list.value = res.list
    }else{
        // 后续获取数据
        list.value.push(...res.list)
    }

    // 如果全部获取完毕
    if(list.value.length === res.total){
        isEnd.value = true
    }
}

// 详情页是否可见
const isVisible = ref(false)
// 当前详情页
const currentPin = ref({})
const toPins = (item) => {
    // 只改变浏览器地址栏中的 URL，不会触发 Vue Router 的任何导航事件或组件生命周期(更新地址而不导航)
    // 使用这个的原因是因为希望做到过渡效果  如果使用router.push页面被刷新 就没有过渡效果了
    history.pushState(null, null, `/pin/${item.id}`)
    currentPin.value = item
    isVisible.value = true
}

// 监听浏览器后退事件
useEventListener(window,'popstate',() => {
    isVisible.value = false
})

// 进入详情页的过渡效果
const beforeEnter = (el) => {
    gsap.set(el, {
        // 使元素在X和Y方向上不可见
        scaleX: 0,
        scaleY: 0,
        // 变换的原点设置为左上角
        transformOrigin: '0 0',
        // 元素的初始位置
        x: currentPin.value.imgCenter.centerX,
        y: currentPin.value.imgCenter.centerY,
        opacity: 0
    })
}
const enter = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        // 元素恢复到原始大小
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        translateX: 0,
        translateY: 0,
        onComplete: done // 告知vue过渡已完成
    })
}
const leave = (el,done) => {
    gsap.to(el, {
        duration: 0.3,
        scaleX: 0,
        scaleY: 0,
        x: currentPin.value.imgCenter.centerX,
        y: currentPin.value.imgCenter.centerY,
        opacity: 0,
        onComplete: done // 告知vue过渡已完成
    })
}

// 监听类别
const categoryStore = useCategoryStore()
watch(()=>categoryStore.now,(newCategory) => {
    console.log(pinia.state.value)
    query = {page:1,size:20,categoryId: newCategory}
    list.value = []
    isEnd.value = false
    getPexelsData()
})

// 监听搜索项的变化
const searchStore = useSearchStore()
watch(()=>searchStore.searchItem,(newItem) => {
    console.log(pinia.state.value)
    query = {page:1,size:20,searchText: newItem}
    list.value = []
    isEnd.value = false
    getPexelsData()
})

// 组件销毁时(例如进行了路由跳转)需把left top信息进行删除
onUnmounted(() => {
    list.value.forEach(item => {
        delete item.left,item.top
    })
})

</script>

<style lang="less" scoped>

</style>