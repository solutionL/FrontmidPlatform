<template>
    <div 
    @click="goLogin"
    class="flex items-center"
    >
        <el-popover
        placement="bottom"
        :effect="themeType"
        :visible="false"
        trigger="hover"
      >
          <template #reference>
              <button class="bg-red-500 p-[12.5px] rounded">
                  <m-svg-icon
                  name="profile"
                  class="w-1.5 h-1.5"
                  fill="#fff"
                  />
              </button>
          </template>
      </el-popover>
    </div>
</template>

<script setup>
import { useThemeStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = useThemeStore()
const { themeType } = storeToRefs(store)

const router = useRouter()
const goLogin = () => {
    router.push('/login')
}
</script>

<style lang="less" scoped>

</style>