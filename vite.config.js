// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         {
//           src: 'public/manifest.json',
//           dest: '.',
//         }
//       ],
//     }),
//   ],
//   build: {
//     outDir: 'build',
//     rollupOptions: {
//       input: {
//         main: './index.html',
//       },
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If you're using React, otherwise you can remove this line

export default defineConfig({
  plugins: [react()], // Add React plugin if you're using React
  build: {
    outDir: 'dist', // Output directory for the build
  },
  resolve: {
    alias: {
      // Define any aliases for easier imports
      '@': '/src', // Example alias for src directory
    },
  },
});
