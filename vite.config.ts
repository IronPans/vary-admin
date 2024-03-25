import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.cn/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/' : '',
  build: {
    outDir: path.resolve(__dirname, './build'),
    rollupOptions: {
      // input: path.resolve(__dirname, './src/main.ts')
    }
  },
  // publicDir: path.resolve(__dirname, './src/assets'),
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: 'always'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry:
        process.env.NODE_ENV === 'production'
          ? path.resolve(__dirname, './src/main.ts')
          : 'src/main.ts',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'src/index.html',

      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'VaryVui',
          publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
          mode: process.env.NODE_ENV
        },
        tags: [
          // {
          //   injectTo: 'body-prepend',
          //   tag: 'div',
          //   attrs: {
          //     id: 'tag'
          //   }
          // }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@varyui': path.resolve(__dirname, 'src/base/vary-ui'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  }
})
