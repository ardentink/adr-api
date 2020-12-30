import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddPasswordToUser1609289175458 implements MigrationInterface {
  name = 'AddPasswordToUser1609289175458'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      sql`ALTER TABLE "user" ADD "password" character varying`
    )
    await queryRunner.query(sql`UPDATE "user" SET "password" = 'UNSET'`)
    await queryRunner.query(
      sql`ALTER TABLE "user" ALTER COLUMN "password" set NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`ALTER TABLE "user" DROP COLUMN "password"`)
  }
}
