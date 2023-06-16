import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Test1686853605786 implements MigrationInterface {
  name = 'Test1686853605786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE \`categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(200) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
    // );
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
