import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import commonjs from 'vite-plugin-commonjs';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    commonjs()
  ],
  optimizeDeps: {
    exclude: ['@mui/x-data-grid'],
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
  // build: {
  //   /** If you set esmExternals to true, this plugins assumes that 
  //     all external dependencies are ES modules */
  //   commonjsOptions: {
  //     esmExternals: true
  //   },
  // }
});
