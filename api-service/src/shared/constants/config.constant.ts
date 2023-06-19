import * as config from 'config';
import { DataSourceOptions } from 'typeorm';
import { isProduction } from './common.contants';

export const getAllowedOrigins = (): string | string[] => {
  const allowedOrigins = config.get<string>('allowedOrigins').split(',');
  return allowedOrigins[0] === '*' ? '*' : allowedOrigins;
};

export const getHost = () => {
  const hostname = config.get('server.hostname');
  if (hostname) {
    return `${hostname}`;
  } else {
    return `${config.get('server.host')}:${config.get('server.port')}`;
  }
};
export type DbConfig = {
  type: string;
  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  logging: boolean;
};
export const getDbConnection = (): DataSourceOptions => {
  const dbConfig = config.get('typeorm');
  return {
    type: dbConfig.type,
    host: dbConfig.host,
    username: dbConfig.username,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database,
    logging: dbConfig.logging,
    synchronize: false,
    migrations: [
      isProduction
        ? `${process.cwd()}/dist/src/migrations/**/*{.ts,.js}`
        : `${process.cwd()}/dist/src/migrations/**/*{.ts,.js}`,
    ],
    entities: [
      isProduction
        ? `${process.cwd()}/dist/src/entities/*.entity{.ts,.js}`
        : `${process.cwd()}/dist/src/entities/*.entity{.ts,.js}`,
    ],
    migrationsRun: false,
  };
};

export type JwtConfig = {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
  jwtSecret: string;
};
export const getJwtConfig = (): JwtConfig => {
  const jwtConfig = config.get('jwt');
  return {
    accessTokenSecret: jwtConfig?.at_secret || '',
    accessTokenExpiresIn: jwtConfig?.at_expires_in,
    refreshTokenSecret: jwtConfig?.rt_secret,
    refreshTokenExpiresIn: jwtConfig?.rf_expires_in,
    jwtSecret: jwtConfig?.secret,
  };
};

export const getPinoLoggerOptions = () => ({
  pinoHttp: {
    enabled: true,
    level: isProduction ? 'info' : 'debug',
  },
});
