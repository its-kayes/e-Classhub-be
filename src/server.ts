import mongoose, { ConnectOptions } from 'mongoose';
import { server } from './app'; // Import the server from app.ts
import { MONGO_URI, PORT } from './config/siteEnv';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(
      MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
    );

    console.log('DB Connected!');
    server.listen(PORT, () => console.log(`Server Ok ? ${PORT}`));
  } catch (error) {
    console.log('Failed to connect database', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
