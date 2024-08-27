import { createPinia,defineStore } from 'pinia'
import { ALL_CATEGORY,CATEGORY_DATA,THEME_LIGHT } from "../constants";
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 定义各个模块的store
export const useCategoryStore = defineStore('category',{
    state:() => ({
        category:CATEGORY_DATA,
        // 当前分类
        now:ALL_CATEGORY.id
    })
})

export const useSearchStore =  defineStore('search',{
    state:() => ({
         // 历史记录 
         history:[],
         // 点击搜索提示得到的搜索项
         searchItem:'',
    })
 })

export const useThemeStore = defineStore('theme',{
    state:() => ({
        themeType: THEME_LIGHT
    })
})

// 创建pinia实例
const pinia = createPinia()
// 添加持久存储插件
pinia.use(createPersistedState({
    key:'imooc-front',
    paths:['category','search','theme'],
    storage:localStorage
}))

export default pinia