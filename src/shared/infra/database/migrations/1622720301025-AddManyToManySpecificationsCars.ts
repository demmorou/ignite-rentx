import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToManySpecificationsCars1622720301025
  implements MigrationInterface {
  name = 'AddManyToManySpecificationsCars1622720301025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specifications_cars" ("fk_car_id" character varying NOT NULL, "fk_specification_id" character varying NOT NULL, CONSTRAINT "PK_08b1576a5ec5ad99e8659dd3a1c" PRIMARY KEY ("fk_car_id", "fk_specification_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_34f349a81733dd29e3561e4de6" ON "specifications_cars" ("fk_car_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3daaba602c1b1057c0a1b24b7" ON "specifications_cars" ("fk_specification_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_34f349a81733dd29e3561e4de65" FOREIGN KEY ("fk_car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_e3daaba602c1b1057c0a1b24b7a" FOREIGN KEY ("fk_specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_e3daaba602c1b1057c0a1b24b7a"`
    );
    await queryRunner.query(
      `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_34f349a81733dd29e3561e4de65"`
    );
    await queryRunner.query(`DROP INDEX "IDX_e3daaba602c1b1057c0a1b24b7"`);
    await queryRunner.query(`DROP INDEX "IDX_34f349a81733dd29e3561e4de6"`);
    await queryRunner.query(`DROP TABLE "specifications_cars"`);
  }
}
