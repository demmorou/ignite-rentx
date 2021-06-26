import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTokensTable1624670088648 implements MigrationInterface {
  name = 'CreateUsersTokensTable1624670088648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_tokens" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "refresh_token" character varying NOT NULL, "fk_user_id" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_30ff13567248adc4fce578914c3" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_30ff13567248adc4fce578914c3"`
    );
    await queryRunner.query(`DROP TABLE "users_tokens"`);
  }
}
