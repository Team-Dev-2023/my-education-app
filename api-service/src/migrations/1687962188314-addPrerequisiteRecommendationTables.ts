import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrerequisiteRecommendationTables1687962188314
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE courses
        DROP COLUMN prerequisites
    `);
    await queryRunner.query(`
        ALTER TABLE courses
        DROP COLUMN recommendation
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS course_prerequisite (
            uuid varchar(36) NOT NULL,
            description varchar(500) NULL,
            courseUuid varchar(36) NOT NULL,
            PRIMARY KEY (uuid)
        ) ENGINE = innoDB
    `);

    await queryRunner.query(`
       ALTER TABLE  course_prerequisite
       ADD CONSTRAINT fk_course_prerequisite_course FOREIGN KEY (courseUuid) REFERENCES courses(uuid)
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS course_recommendation (
            uuid varchar(36) NOT NULL,
            description varchar(500) NULL,
            courseUuid varchar(36) NOT NULL,
            PRIMARY KEY (uuid)
        ) ENGINE = innoDB
    `);

    await queryRunner.query(`
        ALTER TABLE  course_recommendation
        ADD CONSTRAINT fk_course_recommendation_course FOREIGN KEY (courseUuid) REFERENCES courses(uuid)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE course_prerequisite
        DROP CONSTRAINT fk_course_prerequisite_course
    `);
    await queryRunner.query(`
        ALTER TABLE course_recommendation
        DROP CONSTRAINT fk_course_recommendation_course
    `);

    await queryRunner.query(`
        DROP TABLE IF EXISTS course_prerequisite
    `);

    await queryRunner.query(`
        DROP TABLE IF EXISTS course_recommendation
    `);

    await queryRunner.query(`
        ALTER TABLE courses
        ADD COLUMN prerequisites varchar(2000) NULL
    `);

    await queryRunner.query(`
        ALTER TABLE courses
        ADD COLUMN recommendation varchar(2000) NULL
    `);
  }
}
