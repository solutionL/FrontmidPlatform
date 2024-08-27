import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path,{ join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs:[path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId:'icon-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // src路径
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  /* 
    代理后才能访问的原因主要涉及跨域资源共享（CORS）和浏览器的安全策略
    代理的作用：通过设置代理，您的前端应用并不直接请求外部 API，而是先请求本地的代理服务器。
                代理服务器接到请求后，再将其转发到目标 API
    修改请求头：代理可以修改请求的 Origin 头部，使请求看起来是来自被允许的源，从而绕过CORS的限制
  */
  server:{
    // 服务器代理功能
    proxy:{
      // 代理所有/api功能
      '/api':{
        // 代理请求后的目标地址
        target:'https://api.imooc-front.lgdsunday.club/',
        // 确保请求的源头origin在代理请求时被更改为目标 URL
        changeOrigin:true
      }
    }
  }
})
