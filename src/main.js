import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
// 引入tailwind
import './style/input.css'
// 引入组件
import mLibs from './libs'
// 响应式布局
import { useREM } from './utils/flexible'
// 注册 SVG 图标
import 'virtual:svg-icons-register'
// 自定义的图片懒加载指令
import directive from './directive'
// 注册element-plus组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

useREM()
app.use(directive)
app.use(pinia)
app.use(router)
app.use(mLibs)
app.mount('#app')
