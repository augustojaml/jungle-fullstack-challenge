import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateTasks1761790000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    // Criar ENUM types
    await queryRunner.query(`
      CREATE TYPE task_priority_enum AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT')
    `)

    await queryRunner.query(`
      CREATE TYPE task_status_enum AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED')
    `)

    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'task_priority_enum',
            isNullable: false,
            default: `'LOW'`,
          },
          {
            name: 'status',
            type: 'task_status_enum',
            isNullable: false,
            default: `'TODO'`,
          },
          {
            name: 'creator_id',
            type: 'uuid',
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
        indices: [
          { name: 'idx_tasks_creator_id', columnNames: ['creator_id'] },
          { name: 'idx_tasks_status', columnNames: ['status'] },
          { name: 'idx_tasks_due_date', columnNames: ['due_date'] },
          { name: 'idx_tasks_priority', columnNames: ['priority'] },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'fk_tasks_creator',
        columnNames: ['creator_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'fk_tasks_creator')
    await queryRunner.dropTable('tasks')
    await queryRunner.query(`DROP TYPE IF EXISTS task_status_enum`)
    await queryRunner.query(`DROP TYPE IF EXISTS task_priority_enum`)
  }
}
