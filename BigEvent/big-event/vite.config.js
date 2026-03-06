import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: { 
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy:{
      // 获取路径中包含了/api的请求
      '/api':{
        target:'http://localhost:8080', // 后台服务所在的源路径
        changeOrigin:true, // 改变源路径,  为true时,  会将请求路径中的/api替换为http://localhost:8080
        rewrite:(path)=>path.replace(/^\/api/,'') // 重写路径, 将路径中的/api替换为'',  也就是将请求路径中的/api去掉,  因为后台服务的接口路径中没有/api
      }
    }
  }
})
