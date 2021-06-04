import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableColumns1622833084268 implements MigrationInterface {
  name = 'AddNullableColumns1622833084268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rentals" ALTER COLUMN "end_date" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ALTER COLUMN "total" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rentals" ALTER COLUMN "total" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ALTER COLUMN "end_date" SET NOT NULL`
    );
  }
}
