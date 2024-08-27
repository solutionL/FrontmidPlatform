<template>
    <div class="relative" ref="container" :style="{height:containerHeight+'px'}">
        <!-- 得到当前列数以及数据源之后再渲染 -->
         <template v-if="column&&list.length">
            <div 
            class = "waterfull absolute duration-300"
            v-for="item of list"
            :style="{width:columnWidth+'px', top:item.top+'px', left:item.left+'px'}"
            >
                <slot :item="item" :width="columnWidth"></slot>
            </div>
         </template>
         <div v-else>加载中...</div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, nextTick } from 'vue';

const props = defineProps({
    list:{
        type:Array,
        require:true
    },
    column:{
        type:Number,
        default:2
    }
})

/* 
    列宽:需根据当前是移动端还是客户端判断 
*/

// 容器
const container = ref(null)
// 容器宽度
const containerWidth = ref(0)
// 列宽
const columnWidth = ref(0)
// 列间距
const columnSpacing = 20
// 行间距
const rowSpacing = 20
// 计算列宽
const useItemWidth = () => {
    containerWidth.value = container.value.offsetWidth
    // 根据列数计算列宽 容器总宽度 - 总列间距
    columnWidth.value = (containerWidth.value - (props.column-1) * columnSpacing) / props.column
}

/* 
    列高: 每列中每个item的top值
*/

// 容器的总高度
const containerHeight = ref(0)
// 各列的总高度
const Heights = reactive([])
// i:列 value:高度
const useColumnHeight = () => {
    Heights.length = props.column
    Heights.fill(0)
}

// 获取所有图片的高度
let imgsHeight = reactive([])
const getItem = () => {
    // 避免累加
    imgsHeight = []
    const waterfulls = document.querySelectorAll('.waterfull')
    waterfulls.forEach(el => {
        imgsHeight.push(el.offsetHeight)
    })
    setLocation()
}

// 图片预加载
const getImg = () => {
    const waterfulls = document.querySelectorAll('.waterfull')
    let imgLoadPromises = []
    waterfulls.forEach(el => {
        const img = el.querySelector('img')
        if(img){
            imgLoadPromises.push(new Promise((resolve) => {
                if(img.complete){
                    // 如果已经加载 直接获取图片高度
                    imgsHeight.push(img.offsetHeight)
                    resolve()
                }else{
                    // 加载完成后获取高度
                    img.onload = () => {
                        imgsHeight.push(img.offsetHeight)
                        resolve()
                    }
                }
            }))
        }
    })
    Promise.all(imgLoadPromises).then(() => {
        setLocation()
    })
}

const setLocation = () => {
    useColumnHeight()
    // 动态生成left top属性
    props.list.forEach((item,index) => {
        let col = index % props.column
        // 当前列距左边的距离
        item.left = col * ( columnWidth.value + columnSpacing )
        // 当前列的高度
        item.top = Heights[col]
        // 每列高度自增
        Heights[col] += imgsHeight[index] + rowSpacing
    })
    // 设置容器的高度
    containerHeight.value = Math.max(...Heights)
}

onMounted(() => {
    // 当访问 container.value.offsetWidth 时，可能组件尚未挂载到 DOM 中
    useItemWidth()
    useColumnHeight()
})


// 监测list数据
watch(()=>props.list.length,() => {
    nextTick(() => {
        // dom更新后获取数据
        getItem()
    })
})

</script>

<style lang="less" scoped>

</style>