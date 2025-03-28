import { ENV } from '@/config';
import { initServer } from './server';
import { connectDb } from './lib';

async function bootstrap() {
  const server = initServer();
  // socketServer(server);
  const port = ENV.PORT;

  try {
    await connectDb();
    server.listen(port, () => {
      console.log('Bootstrap: ', `BetLive24 server started on port: ${port}`);
    });
  } catch (error) {
    console.log(`Failed to start BetLive24 API: ${error}`);
    process.exit(1);
  }
}

bootstrap();
