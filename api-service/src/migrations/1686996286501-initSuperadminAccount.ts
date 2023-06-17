import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSuperadminAccount1686996286501 implements MigrationInterface {
  name = 'InitSuperadminAccount1686996286501';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        \INSERT INTO users (createdAt,lastUpdatedAt,createdBy,lastUpdatedBy,uuid,email,phone,avatar,firstName,lastName,country,role,refreshToken) VALUES
	    \('2023-06-17 09:52:41','2023-06-17 09:52:41','superadmin',NULL,'09856c51-db73-40d3-8b86-d46054c839b4','','',NULL,'','','VN',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsInV1aWQiOiIwOTg1NmM1MS1kYjczLTQwZDMtOGI4Ni1kNDYwNTRjODM5YjQiLCJpYXQiOjE2ODY5OTU1NjEsImV4cCI6MTY4NzQyNzU2MX0.AQsEvjGjkWBFTkbpx1s02dycenDp--j89id7c6Nx0BE')
    `);
    await queryRunner.query(`
	    \INSERT INTO login_methods (uuid,username,password,method,isVerified,verificationCode,userUuid) VALUES
        \('50948182-b9a4-4816-98c0-770d75efe785','superadmin','$2b$10$EKVx5PvT4IXbxss5XkayS.FGDMXUPGEfD7QlNBez0GNpJn1bpOHq.',0,1,'','09856c51-db73-40d3-8b86-d46054c839b4')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM login_methods WHERE userUuid='09856c51-db73-40d3-8b86-d46054c839b4'`,
    );
    await queryRunner.query(
      `DELETE FROM users WHERE uuid='09856c51-db73-40d3-8b86-d46054c839b4'`,
    );
  }
}
