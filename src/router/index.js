import { createRouter, createWebHistory } from "vue-router";
import pcRouter from './modules/pc-route'

const router = createRouter({
    history:createWebHistory(),
    routes:pcRouter
})

export default router