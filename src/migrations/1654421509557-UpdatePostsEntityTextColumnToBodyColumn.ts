import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePostsEntityTextColumnToBodyColumn1654421509557
  implements MigrationInterface
{
  name = 'UpdatePostsEntityTextColumnToBodyColumn1654421509557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" RENAME COLUMN "text" TO "body"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" RENAME COLUMN "body" TO "text"`,
    );
  }
}
