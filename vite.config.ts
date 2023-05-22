import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'

const envStr = 'test'

const evnPath = `http://gongyi-${envStr}.zhcslyg.com`

const pathMap = {
  online: 'https://online.zhcslyg.com',
  test: evnPath,
  pre: evnPath,
}

export default defineConfig({
  base: '/chatgpt/',
  publicDir: '/chatgpt',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  server: {
    strictPort: false,
    port: 3020,
    host: true,
    proxy: {
      '/api': {
        target: pathMap[envStr],
        rewrite: (path) => path.replace(/^\/api/, '/bus/web_awesomed'),
        changeOrigin: true,
      },
    },
    hmr: { overlay: true },
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: true,
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' }), IconsResolver({ enabledCollections: ['ep'] })],
    }),
    Icons({ autoInstall: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    eslintPlugin(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.json$/],
      imports: ['vue'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' })],
      dts: './auto-imports.d.ts',
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
})
