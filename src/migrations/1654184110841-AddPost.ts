import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPost1654184110841 implements MigrationInterface {
  name = 'AddPost1654184110841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
