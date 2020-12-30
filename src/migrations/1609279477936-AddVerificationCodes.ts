import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddVerificationCodes1609279477936 implements MigrationInterface {
  name = 'AddVerificationCodes1609279477936'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TABLE "verification_code" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        CONSTRAINT "UQ_5342614d61333af21e5dda2b103" UNIQUE ("uuid"),
        CONSTRAINT "UQ_9c5ed56de22b2dc89d9f4fbdd57" UNIQUE ("email"),
        CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY ("id")
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`DROP TABLE "verification_code"`)
  }
}
