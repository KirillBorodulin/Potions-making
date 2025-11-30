import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// Плагин для удаления "use-client" директив у иконок VK, если вдруг понадобится
function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code: string, id: string) {
      if (id.includes('@vkontakte/icons')) {
        const patched = code.replace(/"use-client";?/g, '');
        return { code: patched };
      }
      return { code };
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({ targets: ['defaults', 'not IE 11'] })
  ],
  build: { outDir: 'build' }
});