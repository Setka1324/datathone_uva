import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',  // Allow connections from any device on the network
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',  // Point to your Flask backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
