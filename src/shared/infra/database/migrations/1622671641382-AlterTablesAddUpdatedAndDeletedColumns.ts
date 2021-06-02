import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesAddUpdatedAndDeletedColumns1622671641382
  implements MigrationInterface {
  name = 'AlterTablesAddUpdatedAndDeletedColumns1622671641382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "deleted_at" TIMESTAMP`
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "cars" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "specifications" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "specifications" ADD "deleted_at" TIMESTAMP`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specifications" DROP COLUMN "deleted_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "specifications" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "deleted_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
  }
}
