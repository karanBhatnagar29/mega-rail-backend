// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: [
//       'http://localhost:3001',
//       'http://13.202.200.98:3001',
//       'https://mega-rail-frontend.vercel.app',
//       'http://mega-rail-frontend.vercel.app',
//     ], // your Next.js frontend
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type, Authorization',
//   });
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export async function createApp() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors({
    origin: [
      '*',
      'http://localhost:3001',
      'http://13.202.200.98:3001',
      'https://mega-rail-frontend.vercel.app',
      'http://mega-rail-frontend.vercel.app',
      'https://mega-rail-backend.vercel.app',
      'http://mega-rail-backend.vercel.app',
      'https://megarailpowerproject.vercel.app',
      'http://megarailpowerproject.vercel.app'
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.init();
  return server;
}
