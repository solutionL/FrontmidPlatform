<template>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 ">
        <pcNav></pcNav>
        <List class="max-w-screen-xl mx-auto xl:mt-3"></List>
    </div>
</template>

<script setup>
import pcNav from './nav/pc/index.vue'
import List from './list/index.vue'
</script>

<style lang="less" scoped>

</style>