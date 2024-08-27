import { useIntersectionObserver } from "@vueuse/core";

// 图片懒加载 只有当用户可以看到某张图片时，才会从网络加载该图片

/* 
    useIntersectionObserver 判断用户是否看见了图片
    两个参数( 要观察的元素 , 回调函数) 
    元素发生变化后会返回的通常是一个包含观察结果(数组)和控制方法(stop)的对象 
    并执行回调函数
*/

/* 
    如何做到不加载图片:
    img 的 src 属性是网络地址时，则会从网络中获取该图片资源。
    要想不加载图片 则把该网络地址默认替换为非网络地址，然后当用户可见时，在替换成网络地址。
*/

export default {
    // el此时代表img标签
    mounted(el) {
        // 1.拿到图片src
        const imgSrc = el.src

        // 2.让当前图片不可见
        el.src = ''

        /* 
            为回调函数传入返回数组的第一个元素里面的isIntersecting属性
            (指示该元素是否在用户当前可见的浏览器窗口内)
        */
        const { stop } = useIntersectionObserver(el,([ { isIntersecting } ]) => {
            // 如果可见
            if(isIntersecting){
                el.src = imgSrc
                stop()
            }
        })
    }
}