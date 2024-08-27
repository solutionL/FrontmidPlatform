<template>
    <svg class="icon" aria-hidden="true">
        <use :class="fillColor" :xlink:href="xlink" :fill="color"></use>
    </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    fillColor:{
        type:String
    },
    name:{
        required:true,
        type:String
    },
    color:{
        type:String
    }
})

const xlink = computed(() => `#icon-${props.name}`)

</script>

<style lang="less" scoped>

</style>