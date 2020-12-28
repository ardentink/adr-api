import { MigrationInterface, QueryRunner } from 'typeorm'

export class BootstrapUuidFunctions1608276850932 implements MigrationInterface {
  name = 'BootstrapUuidFunctions1608276850932'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF NOT EXISTS "uuid-ossp"`)
  }
}
