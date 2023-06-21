import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelatedWithCategoryTables1687255865288
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`categories\` RENAME COLUMN \`image\` TO \`imageUrl\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`categories\` MODIFY \`imageUrl\` varchar(200) NULL
    `);
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS \`sub_categories\`(
            \`uuid\` varchar(36) NOT NULL,
            \`name\` varchar(200) NOT NULL,
            \`imageUrl\` varchar(200) NULL,
            \`categoryUuid\` varchar(36) NULL,
            \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`lastUpdatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`createdBy\` varchar(500) NOT NULL,
            \`lastUpdatedBy\` varchar(500) NULL,
            PRIMARY KEY (\`uuid\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
       ALTER TABLE \`sub_categories\`
       ADD CONSTRAINT \`FK_category_sub_categories\` FOREIGN KEY (\`categoryUuid\`) REFERENCES \`categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE categories RENAME COLUMN imageUrl TO image
    `);
    await queryRunner.query(`
        ALTER TABLE categories MODIFY image  varchar(200) NOT NULL
    `);
    await queryRunner.query(`
        DROP TABLE IF EXISTS \`sub_categories\`
    `);
  }
}
