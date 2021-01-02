import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddSlugToProject1609556634607 implements MigrationInterface {
  name = 'AddSlugToProject1609556634607'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "project" ADD "slug" character varying
    `)
    await queryRunner.query(sql`
      UPDATE "project" SET "slug" = REPLACE(LOWER(name), ' ', '_')
    `)
    await queryRunner.query(sql`
      CREATE UNIQUE INDEX "IDX_edafaf48d756db388874b06abf" ON "project" ("userId", "slug")
    `)
    await queryRunner.query(sql`
      ALTER TABLE "project" ALTER COLUMN "slug" set NOT NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`DROP INDEX "IDX_edafaf48d756db388874b06abf"`)
    await queryRunner.query(sql`ALTER TABLE "project" DROP COLUMN "slug"`)
  }
}
