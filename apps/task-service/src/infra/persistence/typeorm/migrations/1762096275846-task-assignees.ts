import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableUnique,
} from 'typeorm'

export class TaskAssignees1762096275846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.createTable(
      new Table({
        name: 'task_assignees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'task_id', type: 'uuid', isNullable: false },
          // user_id vem do auth-service (sem FK)
          { name: 'user_id', type: 'uuid', isNullable: false },

          // timestamps
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

    // FK task_id -> tasks.id
    await queryRunner.createForeignKey(
      'task_assignees',
      new TableForeignKey({
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )

    // UNIQUE composto (task, user)
    await queryRunner.createUniqueConstraint(
      'task_assignees',
      new TableUnique({
        name: 'uq_task_assignees_task_user',
        columnNames: ['task_id', 'user_id'],
      }),
    )

    // Índices
    await queryRunner.createIndex(
      'task_assignees',
      new TableIndex({
        name: 'idx_task_assignees_task',
        columnNames: ['task_id'],
      }),
    )
    await queryRunner.createIndex(
      'task_assignees',
      new TableIndex({
        name: 'idx_task_assignees_user',
        columnNames: ['user_id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('task_assignees', 'idx_task_assignees_user')
    await queryRunner.dropIndex('task_assignees', 'idx_task_assignees_task')
    await queryRunner.dropUniqueConstraint(
      'task_assignees',
      'uq_task_assignees_task_user',
    )

    const table = await queryRunner.getTable('task_assignees')
    const fk = table?.foreignKeys.find((f) => f.columnNames.includes('task_id'))
    if (fk) await queryRunner.dropForeignKey('task_assignees', fk)

    await queryRunner.dropTable('task_assignees')
  }
}
