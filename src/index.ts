import { Server } from './server';

(async (): Promise<void> => {
  try {
    const server = new Server(5000);
    await server.init();
    await server.start();
  } catch (error) {
    console.log(`[Initialize] - Error to initialize API: ${error}`);
  }
})();