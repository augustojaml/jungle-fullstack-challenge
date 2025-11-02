// task-entity.ts
import {
  TASK_PRIORITY,
  TASK_STATUS,
  TaskPriority,
  TaskStatus,
} from '@repo/types'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TaskUser } from './task-user'

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate!: Date

  @Column({ type: 'enum', enum: TASK_PRIORITY })
  priority!: TaskPriority

  @Column({ type: 'enum', enum: TASK_STATUS, default: 'TODO' })
  status!: TaskStatus

  // Relação: tasks.creator_id -> users.id
  @ManyToOne(() => TaskUser, (user) => user.createdTasks, {
    onDelete: 'RESTRICT',
    eager: false, // lazy loading por padrão
  })
  @JoinColumn({ name: 'creator_id' })
  creator!: TaskUser

  // Coluna de FK (gerenciada automaticamente pelo TypeORM)
  @Column({ name: 'creator_id', type: 'uuid' })
  creatorId!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}

export { Task }
