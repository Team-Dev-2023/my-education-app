import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsernameIndexes1688405479317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE INDEX idx_login_methods_username
        ON login_methods(username)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE login_methods
        DROP INDEX idx_login_methods_username
    `);
  }
}
