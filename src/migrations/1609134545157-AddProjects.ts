import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddProjects1609134545157 implements MigrationInterface {
  name = 'AddProjects1609134545157'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TABLE "project" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "userId" integer,
        CONSTRAINT "UQ_bcbc9244374131f3ccb908aa616" UNIQUE ("uuid"),
        CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
      )
    `)
    await queryRunner.query(sql`
      ALTER TABLE "project"
        ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"
          FOREIGN KEY ("userId") REFERENCES "user"("id")
          ON DELETE NO ACTION
          ON UPDATE NO ACTION
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"
    `)
    await queryRunner.query(sql`DROP TABLE "project"`)
  }
}
