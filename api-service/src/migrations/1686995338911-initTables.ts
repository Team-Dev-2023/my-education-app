import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1686995338911 implements MigrationInterface {
  name = 'InitTables1686995338911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`createdAt\` datetime NOT NULL,
                \`lastUpdatedAt\` datetime NOT NULL,
                \`createdBy\` varchar(500) NOT NULL,
                \`lastUpdatedBy\` varchar(500) NULL,
                \`uuid\` varchar(36) NOT NULL,
                \`email\` varchar(320) NOT NULL,
                \`phone\` varchar(20) NULL,
                \`avatar\` varchar(500) NULL,
                \`firstName\` varchar(128) NULL,
                \`lastName\` varchar(128) NULL,
                \`country\` varchar(2) NOT NULL,
                \`role\` tinyint NOT NULL DEFAULT '3',
                \`refreshToken\` varchar(500) NULL,
                PRIMARY KEY (\`uuid\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`login_methods\` (
                \`uuid\` varchar(36) NOT NULL,
                \`username\` varchar(256) NOT NULL,
                \`password\` varchar(256) NOT NULL,
                \`method\` tinyint NOT NULL DEFAULT '0',
                \`isVerified\` tinyint NULL,
                \`verificationCode\` varchar(10) NULL,
                \`userUuid\` varchar(36) NULL,
                PRIMARY KEY (\`uuid\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`role_permission\` (
                \`uuid\` varchar(36) NOT NULL,
                \`role\` tinyint NOT NULL DEFAULT '3',
                \`module\` varchar(100) NOT NULL,
                \`action\` tinyint NOT NULL,
                PRIMARY KEY (\`uuid\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`categories\` (
                \`createdAt\` datetime NOT NULL,
                \`lastUpdatedAt\` datetime NOT NULL,
                \`createdBy\` varchar(500) NOT NULL,
                \`lastUpdatedBy\` varchar(500) NULL,
                \`uuid\` varchar(36) NOT NULL,
                \`name\` varchar(200) NOT NULL,
                \`image\` varchar(200) NOT NULL,
                PRIMARY KEY (\`uuid\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`login_methods\`
            ADD CONSTRAINT \`FK_6c845ca8ef4237787918cc7611d\` FOREIGN KEY (\`userUuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`login_methods\` DROP FOREIGN KEY \`FK_6c845ca8ef4237787918cc7611d\`
        `);
    await queryRunner.query(`
            DROP TABLE \`categories\`
        `);
    await queryRunner.query(`
            DROP TABLE \`role_permission\`
        `);
    await queryRunner.query(`
            DROP TABLE \`login_methods\`
        `);
    await queryRunner.query(`
            DROP TABLE \`users\`
        `);
  }
}
