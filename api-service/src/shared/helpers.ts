import * as config from 'config';
import { DataSourceOptions } from 'typeorm';
import { isProduction } from './contants';

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
        ? `${process.cwd()}/dist/migrations/**/*{.ts,.js}`
        : `${process.cwd()}/dist/migrations/**/*{.ts,.js}`,
    ],
    entities: [
      isProduction
        ? `${process.cwd()}/dist/**/*.entity{.ts,.js}`
        : `${process.cwd()}/dist/**/*.entity{.ts,.js}`,
    ],
  };
};
