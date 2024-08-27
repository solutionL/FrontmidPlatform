<template>
    <div 
    class=" w-full px-2 py-1 flex items-center border-b border-zinc-200
            dark:bg-zinc-800 dark:border-b-zinc-700 duration-500">
        <img 
        class="h-4 cursor-pointer mr-2" 
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" alt="logo" />
        <headerSearch class="flex-1"></headerSearch>
        <headerTheme></headerTheme>
        <headerMy></headerMy>
    </div>
</template>

<script setup>
import headerMy from './header-my.vue';
import headerSearch from './header-search/index.vue'
import headerTheme from './header-theme.vue';
</script>

<style lang="scss" scoped>
</style>