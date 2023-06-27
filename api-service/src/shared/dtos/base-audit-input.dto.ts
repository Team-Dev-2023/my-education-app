export abstract class BaseAuditInputDto {
  createdAt?: Date;

  lastUpdatedAt?: Date;

  createdBy?: string;

  lastUpdatedBy?: string;
}
