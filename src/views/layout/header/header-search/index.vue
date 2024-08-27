<template>
    <div class="w-full z-20">
        <m-search 
        v-model="inputValue"
        @search="searchHandler"
        @clear="searchHandler"
        >
            <!-- 下拉框 -->
            <template #dropdown>
                <!-- 搜索提示 -->
                <hint :inputValue="inputValue" v-show="inputValue" @clickText="searchHandler"></hint>
                <history v-show="!inputValue" @selectItem="searchHandler"></history>
                <theme v-show="!inputValue"></theme>
            </template>
        </m-search>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '@/store/index';
import hint from './dropdown/hint.vue';
import history from './dropdown/history.vue';
import theme from './dropdown/theme.vue';

let inputValue = ref('')

const store = useSearchStore()

function searchHandler(val){
    inputValue.value = val
    if(val){
        // 搜索历史
        const index = store.history.findIndex(item => item === val)
        if(index !== -1){
            // 不为-1表示已存在 执行删除操作
            store.history.splice(index,1)
        }
        // 放在第一个位置上
        store.history.unshift(val)
        // 点击搜索提示得到的搜索项
        store.searchItem = val
    }
}
</script>