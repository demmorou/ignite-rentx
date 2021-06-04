import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableRetals1622823606774 implements MigrationInterface {
  name = 'AddTableRetals1622823606774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rentals" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "fk_car_id" character varying NOT NULL, "fk_user_id" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "end_date" TIMESTAMP NOT NULL, "expected_return_date" TIMESTAMP NOT NULL, "total" double precision NOT NULL, CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_73d7e152aced547e9cf5ece62ed" FOREIGN KEY ("fk_car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_d67a007b84a79e4b0b0b06666e6" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_d67a007b84a79e4b0b0b06666e6"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_73d7e152aced547e9cf5ece62ed"`
    );
    await queryRunner.query(`DROP TABLE "rentals"`);
  }
}
