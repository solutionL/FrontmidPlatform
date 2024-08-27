import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/* 
    判断当前是否为移动设备 
    看其是否大于指定的屏幕大小
*/
export const isMobile = computed(() => width.value < PC_DEVICE_WIDTH)

/* 
    rem:相对大小 代表根元素（<html>）的字体大小
    所有使用 rem 的元素都将基于这个根字体大小进行计算
*/

// 动态指定rem
export const useREM = () => {
    const MAX_FONTSIZE = 40
    // 页面元素加载完毕后执行
    document.addEventListener('DOMContentLoaded',() => {
        let html = document.querySelector('html')
        // 根据视口大小设置字体大小
        let fontSize = window.innerWidth / 10
        fontSize = fontSize > MAX_FONTSIZE ? MAX_FONTSIZE : fontSize
        // 1rem就等于根元素html的大小
        html.style.fontSize = fontSize + 'px'
    }) 
}