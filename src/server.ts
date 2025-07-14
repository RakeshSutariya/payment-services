import { app } from "./application"
import { config } from "./config"

const startServer = (): void => {
  app.listen(config.server.port, () => {
    console.log(`🚀 Server listening on http://localhost:${config.server.port}`);
  }).on('error', (err: Error) => {
    console.error('❌ Server failed to start:', err.message);
  });
};

module.exports = startServer();

