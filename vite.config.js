import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({

  plugins: [
    react(),
    reactRefresh(),
  ],

  // config
  root: 'src',
  base: process.env.APP_ENV === 'development' ? '/' : '/dist/',

  build: {
    // output dir for production build
    outDir: '../public/dist',
    emptyOutDir: true,

    // emit manifest so PHP can find the hashed files
    manifest: true,

    target: 'es2015',

    // our main entry
    rollupOptions: { input: path.resolve(__dirname, 'src/index.jsx') },
  },

  server: {
    origin:'http://localhost:3000',
    // required to load scripts from custom host
    cors: true,

    // we need a strict port to match on PHP side
    strictPort: true,
    port: 3000,
    hmr: { host: 'localhost' },
  },
})
