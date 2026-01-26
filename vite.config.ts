
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'figma:asset/f0b3eb2b4458846bec56be8635bb677de4cdf411.png': path.resolve(__dirname, './src/assets/f0b3eb2b4458846bec56be8635bb677de4cdf411.png'),
        'figma:asset/e97faa84609add6cb2cb6f6024ba108cd41ff545.png': path.resolve(__dirname, './src/assets/e97faa84609add6cb2cb6f6024ba108cd41ff545.png'),
        'figma:asset/e94f7dcc213925d5d4aebb0e17925a4a70e66139.png': path.resolve(__dirname, './src/assets/e94f7dcc213925d5d4aebb0e17925a4a70e66139.png'),
        'figma:asset/e6fe213950e5d9ef144275ea40cf1faddf56d574.png': path.resolve(__dirname, './src/assets/e6fe213950e5d9ef144275ea40cf1faddf56d574.png'),
        'figma:asset/cd2eb872b42b5e9801120c8e75a8370637bdc5b0.png': path.resolve(__dirname, './src/assets/cd2eb872b42b5e9801120c8e75a8370637bdc5b0.png'),
        'figma:asset/c35b4985a04d0c772f8fe5914c7570e0e7ac90f1.png': path.resolve(__dirname, './src/assets/c35b4985a04d0c772f8fe5914c7570e0e7ac90f1.png'),
        'figma:asset/aeebc612f9c7bfd006a19f336de58d012423bd8c.png': path.resolve(__dirname, './src/assets/aeebc612f9c7bfd006a19f336de58d012423bd8c.png'),
        'figma:asset/adce7488d6e0f79997ad5a8c5062c725b0d6c7e8.png': path.resolve(__dirname, './src/assets/adce7488d6e0f79997ad5a8c5062c725b0d6c7e8.png'),
        'figma:asset/93599331c27c183974e07c7b8711dc786092acc1.png': path.resolve(__dirname, './src/assets/93599331c27c183974e07c7b8711dc786092acc1.png'),
        'figma:asset/90198f2ec314dfc464a44c45b103bcceb339008d.png': path.resolve(__dirname, './src/assets/90198f2ec314dfc464a44c45b103bcceb339008d.png'),
        'figma:asset/86d32231609f95a8bbde8486468de9984c13225c.png': path.resolve(__dirname, './src/assets/86d32231609f95a8bbde8486468de9984c13225c.png'),
        'figma:asset/82d33e1f4edbaf025323505b00adf1c7c03f00eb.png': path.resolve(__dirname, './src/assets/82d33e1f4edbaf025323505b00adf1c7c03f00eb.png'),
        'figma:asset/72765622bb165dfdbac3b1184674281e3ad57a98.png': path.resolve(__dirname, './src/assets/72765622bb165dfdbac3b1184674281e3ad57a98.png'),
        'figma:asset/71af0fa3a4b700260f35013dcb6a6592ecc75611.png': path.resolve(__dirname, './src/assets/71af0fa3a4b700260f35013dcb6a6592ecc75611.png'),
        'figma:asset/70cbca31f578e12e6f54475a05501d00f2fd5597.png': path.resolve(__dirname, './src/assets/70cbca31f578e12e6f54475a05501d00f2fd5597.png'),
        'figma:asset/705b30a10f138fb5290b4a1597d0c8ec7b139614.png': path.resolve(__dirname, './src/assets/705b30a10f138fb5290b4a1597d0c8ec7b139614.png'),
        'figma:asset/62436b94333b992271b2bd63a2d69bb6c9ee5f70.png': path.resolve(__dirname, './src/assets/62436b94333b992271b2bd63a2d69bb6c9ee5f70.png'),
        'figma:asset/615185059266e399b9e8b101050e467826d5e9b7.png': path.resolve(__dirname, './src/assets/615185059266e399b9e8b101050e467826d5e9b7.png'),
        'figma:asset/4b62f68fb822a2364522d1cdabaf969ad53d4d90.png': path.resolve(__dirname, './src/assets/4b62f68fb822a2364522d1cdabaf969ad53d4d90.png'),
        'figma:asset/42cab77d70c9ce4384e58dbdbc3596e2fd093453.png': path.resolve(__dirname, './src/assets/42cab77d70c9ce4384e58dbdbc3596e2fd093453.png'),
        'figma:asset/2ea45d7e04c9c673edc6dca4e39cb88fd82bef8f.png': path.resolve(__dirname, './src/assets/2ea45d7e04c9c673edc6dca4e39cb88fd82bef8f.png'),
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });