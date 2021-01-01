import { MigrationInterface, QueryRunner } from 'typeorm'
import { tag as sql } from '../utils'

export class AddAuthTokenToUser1609526846582 implements MigrationInterface {
  name = 'AddAuthTokenToUser1609526846582'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "user" ADD "authToken" character varying
    `)
    await queryRunner.query(sql`
      ALTER TABLE "user"
        ADD CONSTRAINT "UQ_fad5227df1977a5f241c991fe93" UNIQUE ("authToken")
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "user"
        DROP CONSTRAINT "UQ_fad5227df1977a5f241c991fe93"
    `)
    await queryRunner.query(sql`ALTER TABLE "user" DROP COLUMN "authToken"`)
  }
}
