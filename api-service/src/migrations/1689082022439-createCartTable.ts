import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCartTable1689082022439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart',
        columns: [
          new TableColumn({
            name: 'courseUuid',
            type: 'varchar',
            length: '36',
            isNullable: false,
          }),
          new TableColumn({
            name: 'userUuid',
            type: 'varchar',
            length: '36',
            isNullable: false,
          }),
          new TableColumn({
            name: 'quantity',
            type: 'integer',
            isNullable: false,
            default: 1,
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'lastUpdatedAt',
            type: 'timestamp',
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `fk_cart_users`,
            columnNames: ['userUuid'],
            referencedTableName: 'users',
            referencedColumnNames: ['uuid'],
          }),
          new TableForeignKey({
            name: `fk_cart_courses`,
            columnNames: ['courseUuid'],
            referencedTableName: 'courses',
            referencedColumnNames: ['uuid'],
          }),
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart', true, true, true);
  }
}
