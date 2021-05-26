import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCars1622033414819 implements MigrationInterface {
  name = 'CreateTableCars1622033414819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" double precision NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" double precision NOT NULL, "brand" character varying NOT NULL, "fk_category_id" character varying, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_1f54b0a59b63fee60f40eb95aac" FOREIGN KEY ("fk_category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_1f54b0a59b63fee60f40eb95aac"`
    );
    await queryRunner.query(`DROP TABLE "cars"`);
  }
}
