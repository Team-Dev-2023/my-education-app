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

export enum EUserRole {
  superadmin = 0,
  admin = 1,
  lecturer = 2,
  student = 3,
}

export enum ELoginMethod {
  password = 0,
  facebook = 1,
  google = 2,
  github = 3,
  linkedIn = 4,
}

export enum EAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GET_ONE = 'GET_ONE',
  GET_ALL = 'GET_ALL',
}

export interface JwtPayload {
  uuid: string;
  username: string;
  role: EUserRole;
}

export interface IPagination {
  page: number;
  perPage: number;
}

export type TOrderBy = 'DESC' | 'ASC';

export const DEFAULT_PAGINATION_PAGE = 20;
export const DEFAULT_PAGINATION_PER_PAGE = 0;
