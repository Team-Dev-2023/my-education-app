import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import * as apiSpecConverter from 'api-spec-converter';
import { SERVICE_CONFIG } from './contants';
import * as swaggerUI from 'swagger-ui-express';
import * as fs from 'fs';

/* Initialize swagger docs */
export async function initSwaggerDocs(app: INestApplication) {
  const serviceName = config.get<string>('service.name');
  const serviceDescription = config.get<string>('service.description');
  const apiVersion = config.get<string>('service.apiVersion');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(serviceDescription)
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .addServer(
      `${config.get('server.swaggerSchema')}://${config.get(
        'server.hostname',
      )}`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(config.get<string>('service.docsBaseUrl'), app, document);

  const [swagger2, oas3] = await generateSwaggerSpecs(app, document);

  app.use(`${SERVICE_CONFIG.docsBaseUrl}/swagger.json`, (req, res) => {
    res.json(oas3);
  });
  app.use(`${SERVICE_CONFIG.docsBaseUrl}/swagger-2.0.json`, (req, res) => {
    res.json(swagger2);
  });

  app.use(
    SERVICE_CONFIG.docsBaseUrl,
    swaggerUI.serve,
    swaggerUI.setup(oas3, {
      swaggerOptions: {
        displayOperationId: true,
      },
      customSiteTitle: SERVICE_CONFIG.title,
    }),
  );
  await writeSwaggerJson(`./`, document);
}
/* Involving nestjs boostrap function */

async function generateSwaggerSpecs(
  app: INestApplication,
  swaggerConfig: Omit<OpenAPIObject, 'paths'>,
): Promise<[any, OpenAPIObject]> {
  const oas3: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: true,
  });
  const swagger2 = await apiSpecConverter
    .convert({
      from: 'openapi_3',
      to: 'swagger_2',
      source: oas3,
    })
    .then((converted) => {
      return converted.spec;
    });
  return [swagger2, oas3];
}

export const writeSwaggerJson = (path: string, document) => {
  fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
};
