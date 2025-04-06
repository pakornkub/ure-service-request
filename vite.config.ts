import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load ENV values based on specified mode

  return {
    base: env.VITE_BASE_PATH || '/', // If not set in .env, use '/' as default value
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    build: {
      chunkSizeWarningLimit: 10000,
    },
  };
});
