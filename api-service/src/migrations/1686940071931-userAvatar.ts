import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAvatar1686940071931 implements MigrationInterface {
  name = 'UserAvatar1686940071931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`avatar\` varchar(500) NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`avatar\`
        `);
  }
}
