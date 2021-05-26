import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesAndSpecificationsTables1620955363863
  implements MigrationInterface {
  name = 'CreateCategoriesAndSpecificationsTables1620955363863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "specifications" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "specifications"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
