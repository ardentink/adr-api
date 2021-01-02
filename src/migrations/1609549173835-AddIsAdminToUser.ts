import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddIsAdminToUser1609549173835 implements MigrationInterface {
  name = 'AddIsAdminToUser1609549173835'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`ALTER TABLE "user" ADD "isAdmin" boolean`)
    await queryRunner.query(sql`UPDATE "user" SET "isAdmin" = 'false'`)
    await queryRunner.query(sql`
      ALTER TABLE "user" ALTER COLUMN "isAdmin" set NOT NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`ALTER TABLE "user" DROP COLUMN "isAdmin"`)
  }
}
