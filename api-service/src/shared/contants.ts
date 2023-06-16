import * as config from 'config';

type ServiceConfig = {
  name: string;
  baseUrl: string;
  docsBaseUrl: string;
  title: string;
  description: string;
  apiVersion: string;
  appVersion: string;
};
export const SERVICE_CONFIG: ServiceConfig = config.get('service');
export const isProduction = process.env.NODE_ENV === 'prod' ? true : false;
