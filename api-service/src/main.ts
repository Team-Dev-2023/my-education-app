import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getAllowedOrigins, getHost } from './shared/constants/config.constant';
import { Logger } from 'nestjs-pino';
import { createLightship } from 'lightship';
import * as express from 'express';
import * as httpContext from 'express-http-context';
import { correlationIdMiddleware } from './middlewares/correlationid.middleware';
import { initSwaggerDocs } from './shared/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptors';
import { SERVICE_CONFIG } from './shared/constants/common.contants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: getAllowedOrigins(),
    },
    bodyParser: true,
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use(correlationIdMiddleware);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix(config.get('service.baseUrl'));
  await initSwaggerDocs(app);
  const lightship = createLightship({});
  await lightship.registerShutdownHandler(() => {
    setTimeout(() => app.close(), +config.get('shutdownDelay') || 5000);
  });
  await app.listen(+config.get('server.port'), () => {
    lightship.signalReady();
  });

  return app;
}
bootstrap()
  .then((app: INestApplication) => {
    const logger = app.get(Logger);

    logger.log(`Education API service started`);
    logger.log(`Started on http://${getHost()}/${SERVICE_CONFIG.baseUrl} `);
    logger.log(
      `Docs available on http://${getHost()}/${SERVICE_CONFIG.docsBaseUrl} `,
    );
  })
  .catch((err) => {
    console.error('Education API service failed to start', err);
  });

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection', { reason, promise });
});
