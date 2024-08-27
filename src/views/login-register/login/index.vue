<template>
    <div class="w-full h-full xl:bg-zinc-200 bg-white dark:bg-zinc-800">
        <headerVue></headerVue>
        <!-- 表单 -->
        <div class="px-3 mt-4 xl:w-[388px] xl:mx-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg xl:bg-white xl:dark:bg-zinc-900 text-center">
            <h3 class="hidden xl:block text-base text-main font-semibold">账号登录</h3>
            <el-form>
                <el-form-item>
                    <el-input
                    class="!border-0 !focus:outline-none"
                    placeholder="用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                    placeholder="密码"
                    class="!border-0 !focus:outline-none"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import headerVue from '../hearder/index.vue'
</script>

<style lang="scss" scoped>
</style>