/*
 * @Author: PX
 * @Date: 2022-11-28 14:31:52
 * @LastEditTime: 2022-11-29 14:51:07
 * @LastEditors: PX
 * @Description:  
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // requireTransform({
    //   fileRegex: /.ts$|.tsx$|.vue$/
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 50001
  },
  // define: {
  //   global: {}
  // }
})
