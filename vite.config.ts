import path from 'node:path';
import generouted from '@generouted/react-router/plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), generouted()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
