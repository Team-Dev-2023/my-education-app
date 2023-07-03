import { User } from 'src/entities';
import { SelectQueryBuilder } from 'typeorm';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_PER_PAGE,
  IPagination,
  TOrderBy,
} from '../constants/common.contants';
import { aliases } from '../constants/repo-tokens.constant';
import * as _ from 'lodash';

export type BaseAuditEntity = { createdBy?: string; lastUpdatedBy?: string };

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
    selectCreatedBy?: boolean;
  },
  mappingFn?: MappingFn<FormatedT>,
) {
  const {
    pagination: {
      page = DEFAULT_PAGINATION_PAGE,
      perPage = DEFAULT_PAGINATION_PER_PAGE,
    },
    orderBy,
    selectCreatedBy = false,
  } = options;

  const clonedQuery = query.clone();
  const totalItems = await clonedQuery.getCount();

  if (!totalItems) {
    return formatPaginatedResponse<FormatedT>([], page, perPage, totalItems);
  }

  if (orderBy) {
    // implement later
  }

  const { limit, offset } = calcPageLimitAndOffset({ page, perPage });
  const data = await query.take(limit).skip(offset).getMany();
  if (selectCreatedBy) {
    const listCreatedByUser = await getCreatedByUser(
      clonedQuery as SelectQueryBuilder<T & BaseAuditEntity>,
      (data as [T & BaseAuditEntity]).map((u) => u.createdBy),
    );
    for (let i = 0; i < data.length; i++) {
      const createdBy = (data[i] as T & BaseAuditEntity)?.createdBy;
      data[i]['createdByUser'] =
        createdBy && _.find(listCreatedByUser, ['createdBy', createdBy]);
    }
  }

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

export async function getCreatedByUser<T>(
  query: SelectQueryBuilder<T & { createdBy?: string }>,
  usernameList: string[],
): Promise<User[]> {
  let listCreatedByUser = [];

  if (!usernameList.length) {
    return listCreatedByUser;
  }

  const clonedQuery = query.clone();
  const uniqUsernameList = _.uniq(usernameList);
  try {
    listCreatedByUser = await clonedQuery
      .createQueryBuilder()
      .select([
        `${aliases.user}.uuid as uuid`,
        `${aliases.user}.firstName as firstName`,
        `${aliases.user}.lastName as lastName`,
        `${aliases.loginMethod}.username as createdBy`,
      ])
      .from(User, aliases.user)
      .leftJoin(`${aliases.user}.loginMethods`, aliases.loginMethod)
      .where(`${aliases.loginMethod}.username IN (:...usernameList)`, {
        usernameList: uniqUsernameList,
      })
      .getRawMany();
  } catch (err) {
    console.error(err);
  }
  return listCreatedByUser;
}
