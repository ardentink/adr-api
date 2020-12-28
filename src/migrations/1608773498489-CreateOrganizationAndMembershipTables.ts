import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrganizationAndMembershipTables1608773498489
  implements MigrationInterface {
  name = 'CreateOrganizationAndMembershipTables1608773498489'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "membership" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "role" character varying NOT NULL,
        "userId" integer,
        "organizationId" integer,
        CONSTRAINT "UQ_55970f8252f6f95ccf682ee4f25" UNIQUE ("uuid"),
        CONSTRAINT "UQ_b0b0c4491354b2fdc681d7e2e24" UNIQUE ("role"),
        CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id")
      )`
    )
    await queryRunner.query(
      `CREATE TABLE "organization" (
        "id" SERIAL NOT NULL,
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "slug" character varying NOT NULL,
        "name" character varying NOT NULL,
        CONSTRAINT "UQ_59f940b5775a9ccf5c2f094c8af" UNIQUE ("uuid"),
        CONSTRAINT "UQ_a08804baa7c5d5427067c49a31f" UNIQUE ("slug"),
        CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id")
      )`
    )
    await queryRunner.query(`COMMENT ON COLUMN "user"."uuid" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "user"
        ADD CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid")`
    )
    await queryRunner.query(
      `ALTER TABLE "membership"
        ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"
          FOREIGN KEY ("userId")
          REFERENCES "user"("id")
          ON DELETE NO ACTION
          ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "membership"
        ADD CONSTRAINT "FK_4c62c8a7ba2337d6d6ffcd8eb6d"
          FOREIGN KEY ("organizationId")
          REFERENCES "organization"("id")
          ON DELETE NO ACTION
          ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "membership" DROP CONSTRAINT "FK_4c62c8a7ba2337d6d6ffcd8eb6d"`
    )
    await queryRunner.query(
      `ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed"`
    )
    await queryRunner.query(`COMMENT ON COLUMN "user"."uuid" IS NULL`)
    await queryRunner.query(`DROP TABLE "organization"`)
    await queryRunner.query(`DROP TABLE "membership"`)
  }
}
