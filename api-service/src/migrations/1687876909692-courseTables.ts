import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseTables1687876909692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS courses (
            uuid varchar(36) NOT NULL,
            title varchar(500) NOT NULL,
            subTitle varchar(500) NULL,
            description varchar(5000) NULL,
            prerequisites varchar(2000) NULL,
            recommendation varchar(2000) NULL,
            imageUrl varchar(500) NULL,
            status tinyint default 0,
            topicUuid varchar(36) NOT NULL,
            createdAt datetime NOT NULL,
            lastUpdatedAt datetime NOT NULL,
            createdBy varchar(500) NOT NULL,
            lastUpdatedBy varchar(500) NULL,
            PRIMARY KEY (uuid)
        )  ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE courses
        ADD CONSTRAINT fk_courses_topics FOREIGN KEY (topicUuid) REFERENCES topics(uuid) 
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS course_knowledge (
            uuid varchar(36) NOT NULL,
            description varchar(500) NOT NULL,
            courseUuid varchar(36) NOT NULL,
            PRIMARY KEY (uuid)
        )  ENGINE = InnoDB
    `);

    await queryRunner.query(`
        ALTER TABLE course_knowledge
        ADD CONSTRAINT fk_course_knowledge_courses FOREIGN KEY (courseUuid) REFERENCES courses(uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS sections (
            uuid varchar(36) NOT NULL,
            name varchar(500) NOT NULL,
            position int NOT NULL,
            courseUuid varchar(36) NOT NULL,
            createdAt datetime NOT NULL,
            lastUpdatedAt datetime NOT NULL,
            createdBy varchar(500) NOT NULL,
            lastUpdatedBy varchar(500) NULL,
            PRIMARY KEY (uuid)
        )  ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE sections
        ADD CONSTRAINT fk_sections_courses FOREIGN KEY (courseUuid) REFERENCES courses(uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS lectures(
            uuid varchar(36) NOT NULL,
            name varchar(500) NOT NULL,
            url varchar(500) NULL,
            description varchar(500) NULL,
            preview boolean DEFAULT TRUE,
            type tinyint DEFAULT 0,
            videoDuration double NULL,
            position int NOT NULL,
            sectionUuid varchar(36) NOT NULL,
            createdAt datetime NOT NULL,
            lastUpdatedAt datetime NOT NULL,
            createdBy varchar(500) NOT NULL,
            lastUpdatedBy varchar(500) NULL,
            PRIMARY KEY (uuid)
        )  ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE lectures
        ADD CONSTRAINT fk_lectures_sections FOREIGN KEY (sectionUuid) REFERENCES sections(uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE lectures
        DROP CONSTRAINT fk_lectures_sections
    `);
    await queryRunner.query(`
        ALTER TABLE sections
        DROP CONSTRAINT fk_sections_courses
    `);
    await queryRunner.query(`
        ALTER TABLE course_knowledge
        DROP CONSTRAINT fk_course_knowledge_courses
    `);
    await queryRunner.query(`
        ALTER TABLE courses
        DROP CONSTRAINT fk_courses_topics
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS lectures
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS sections
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS course_knowledge
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS courses
    `);
  }
}
