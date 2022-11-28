/*
 * @Author: PX
 * @Date: 2022-11-28 14:31:52
 * @LastEditTime: 2022-11-28 17:33:00
 * @LastEditors: PX
 * @Description:  
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 50001
  },
})
