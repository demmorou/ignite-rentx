import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableCarsImages1622750119374 implements MigrationInterface {
  name = 'AddTableCarsImages1622750119374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cars_images" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "fk_car_id" character varying NOT NULL, "image_name" character varying NOT NULL, CONSTRAINT "PK_6180002831bf7873c4c37d7a5a7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "cars_images" ADD CONSTRAINT "FK_382ea9c271c755e55840576df08" FOREIGN KEY ("fk_car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars_images" DROP CONSTRAINT "FK_382ea9c271c755e55840576df08"`
    );
    await queryRunner.query(`DROP TABLE "cars_images"`);
  }
}
