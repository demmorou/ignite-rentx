import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAddAvatar1621123281044 implements MigrationInterface {
  name = 'AlterUserAddAvatar1621123281044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
