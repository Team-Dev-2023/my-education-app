import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRelatedTablesForeignNullConstraint1688410694830
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE course_prerequisite
        MODIFY COLUMN courseUuid varchar(36) NULL
    `);
    await queryRunner.query(`
        ALTER TABLE course_recommendation
        MODIFY COLUMN courseUuid varchar(36) NULL
    `);
    await queryRunner.query(`
        ALTER TABLE course_knowledge
        MODIFY COLUMN courseUuid varchar(36) NULL
    `);
    await queryRunner.query(`
        ALTER TABLE sections
        MODIFY COLUMN courseUuid varchar(36) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE course_prerequisite
        MODIFY COLUMN courseUuid varchar(36) NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE course_recommendation
        MODIFY COLUMN courseUuid varchar(36) NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE course_knowledge
        MODIFY COLUMN courseUuid varchar(36) NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE sections
        MODIFY COLUMN courseUuid varchar(36) NOT NULL
    `);
  }
}
