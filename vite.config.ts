import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/bundle.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue'],
    },
    emptyOutDir: true,
    outDir: 'dist',
  },
})
