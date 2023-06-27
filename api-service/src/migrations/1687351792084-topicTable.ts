import { MigrationInterface, QueryRunner } from 'typeorm';

export class TopicTable1687351792084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS topics (
            uuid VARCHAR(36) NOT NULL,
            name VARCHAR(200) NOT NULL,
            imageUrl VARCHAR(200) NULL,
            subCategoryUuid VARCHAR(36) NULL,
            \`createdAt\` datetime NOT NULL,
            \`lastUpdatedAt\` datetime NOT NULL,
            \`createdBy\` varchar(500) NOT NULL,
            \`lastUpdatedBy\` varchar(500) NULL,
            PRIMARY KEY (uuid)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE topics
        ADD CONSTRAINT FK_topics_sub_categories FOREIGN KEY (\`subCategoryUuid\`) REFERENCES \`sub_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS topics;
    `);
  }
}
