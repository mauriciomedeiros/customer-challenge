import logger from './config/logger';
import { Server } from './server';

(async (): Promise<void> => {
  try {
    const server = new Server(5000);
    await server.init();
    await server.start();
  } catch (error) {
    logger.error('[Initialize] - Error to initialize API:', error);
  }
})();