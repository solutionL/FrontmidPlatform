<template>
    <!-- pc端图标 -->
    <div class="h-8 pt-5 hidden xl:block">
        <img 
        v-lazy
        class="mx-auto"
        src="https://res.lgdsunday.club/signlogo.png" 
        alt="">
    </div>
    <!-- 移动端图标 -->
    <div class="h-[111px] xl:hidden">
        <img 
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png" 
        alt="">
        <img 
        v-lazy
        class="absolute top-[5%] left-[50%] translate-x-[-50%] w-5 h-5"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" 
        alt="">
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
</style>