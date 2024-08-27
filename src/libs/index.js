import { defineAsyncComponent } from "vue"

export default{
    // 全局注册
    install(app){
        // 获取当前路径任意文件夹下的 index.vue 文件
        const components = import.meta.glob('./*/index.vue')
        // 遍历获取到的组件模块
        // key 是文件路径，value 是对应的动态导入函数
        for (const [key, value] of Object.entries(components)) {
        // 拼接组件注册的 name
        const componentName = 'm-' + key.replace('./', '').split('/')[0]
        // 通过 defineAsyncComponent 异步导入指定路径下的组件
        // 当组件被引用时，才会实际加载对应的 index.vue 文件，而不是在应用启动时就加载
        app.component(componentName, defineAsyncComponent(value))
        }
    }
}