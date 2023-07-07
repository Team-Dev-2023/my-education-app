import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoursePriceField1688399434397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE courses
        ADD COLUMN price double NOT NULL DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE courses
        DROP COLUMN price
    `);
  }
}
