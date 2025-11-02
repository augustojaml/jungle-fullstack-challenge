import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameCancelledToReviewStatusEnum1762117498571
  // eslint-disable-next-line prettier/prettier
  implements MigrationInterface {
  name = 'RenameCancelledToReviewStatusEnum1762117498571'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.query(`
      ALTER TYPE task_status_enum RENAME VALUE 'CANCELLED' TO 'REVIEW';
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE task_status_enum RENAME VALUE 'REVIEW' TO 'CANCELLED';
    `)
  }
}
