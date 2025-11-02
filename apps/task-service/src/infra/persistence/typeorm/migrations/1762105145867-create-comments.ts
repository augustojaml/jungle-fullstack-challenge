import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm'

export class CreateComments1762105145867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.createTable(
      new Table({
        name: 'task_comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'task_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'author_id',
            type: 'uuid',
            isNullable: false, // vem do auth-service (sem FK)
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'task_comments',
      new TableForeignKey({
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createIndex(
      'task_comments',
      new TableIndex({
        name: 'idx_task_comments_task',
        columnNames: ['task_id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('task_comments', 'idx_task_comments_task')

    const table = await queryRunner.getTable('task_comments')
    const fk = table?.foreignKeys.find((f) => f.columnNames.includes('task_id'))
    if (fk) await queryRunner.dropForeignKey('task_comments', fk)

    await queryRunner.dropTable('task_comments')
  }
}
