import { SelectQueryBuilder } from 'typeorm';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_PER_PAGE,
  IPagination,
  TOrderBy,
} from '../constants/common.contants';
export type DesctructureOrderBy<T> = {
  [K1 in keyof T]: K1 extends object
    ? {
        [K2 in keyof T[K1]]: TOrderBy;
      }
    : TOrderBy;
};

export interface MappingFn<T> {
  (row: any): T;
}
export interface IPaginatedReponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export function formatPaginatedResponse<T>(
  items,
  page,
  perPage,
  totalItems,
): IPaginatedReponse<T> {
  const totalPages = totalItems ? Math.ceil(totalItems / perPage) : 1;
  return {
    data: items,
    page,
    perPage,
    totalItems,
    totalPages,
  };
}
export function calcPageLimitAndOffset({ page, perPage }: IPagination): {
  limit: number;
  offset: number;
} {
  return {
    limit: perPage,
    offset: (page - 1) * perPage,
  };
}
export async function paginate<T, FormatedT>(
  query: SelectQueryBuilder<T>,
  options: {
    pagination?: IPagination;
    orderBy?: DesctructureOrderBy<T>;
  },
  mappingFn?: MappingFn<FormatedT>,
) {
  const {
    pagination: {
      page = DEFAULT_PAGINATION_PAGE,
      perPage = DEFAULT_PAGINATION_PER_PAGE,
    },
    orderBy,
  } = options;
  const totalItems = await query.clone().getCount();
  if (!totalItems) {
    return formatPaginatedResponse<FormatedT>([], page, perPage, totalItems);
  }
  if (orderBy) {
    // implement later
  }
  const { limit, offset } = calcPageLimitAndOffset({ page, perPage });
  const data = await query.take(limit).skip(offset).getMany();
  if (mappingFn) {
    const formatedData = data.map((element) => mappingFn(element));
    return formatPaginatedResponse<FormatedT>(
      formatedData,
      page,
      perPage,
      totalItems,
    );
  }
  return formatPaginatedResponse<T>(data, page, perPage, totalItems);
}
