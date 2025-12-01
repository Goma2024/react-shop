import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // 保留 optimizeDeps 以确保 JS 组件被正确预构建
  optimizeDeps: {
    include: [
      '@arco-design/web-react',
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});