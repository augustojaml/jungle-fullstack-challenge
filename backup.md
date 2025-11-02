import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableUnique,
} from 'typeorm'

export class TaskAssignees1762083982246 implements MigrationInterface {
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
          {
            name: 'added_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    )

    // FK interna: task_assignees.task_id -> tasks.id
    await queryRunner.createForeignKey(
      'task_assignees',
      new TableForeignKey({
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )

    // Único composto para evitar duplicata (mesmo user duas vezes na mesma task)
    await queryRunner.createUniqueConstraint(
      'task_assignees',
      new TableUnique({
        name: 'uq_task_assignees_task_user',
        columnNames: ['task_id', 'user_id'],
      }),
    )

    // Índices úteis
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


import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Task } from './task'

@Entity('task_assignees')
class TaskAssignee {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'task_id', type: 'uuid' })
  taskId!: string

  // user em outro serviço: guardamos só o ID
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string

  @ManyToOne(() => Task, (task) => task.assignees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task!: Task

  @CreateDateColumn({ name: 'added_at' })
  addedAt!: Date
}

export { TaskAssignee }
