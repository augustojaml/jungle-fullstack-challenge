// src/infra/persistence/typeorm/entities/task-assignee.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Task } from './task'
import { TaskUser } from './task-user'

@Entity('task_assignees')
export class TaskAssignee {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'task_id', type: 'uuid' })
  taskId!: string

  // user em outro serviço: só o ID
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string

  @ManyToOne(() => Task, (task) => task.assignees, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task!: Task

  @ManyToOne(() => TaskUser, { eager: true }) // Adiciona eager: true
  @JoinColumn({ name: 'user_id' })
  user!: TaskUser

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
