// src/infra/persistence/typeorm/entities/task-comment.ts
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

@Entity('task_comments')
export class TaskComment {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'task_id', type: 'uuid' })
  taskId!: string

  @Column({ name: 'author_id', type: 'uuid' })
  authorId!: string

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task!: Task

  // 👉 relação opcional com o autor (TaskUser)
  @ManyToOne(() => TaskUser, { eager: false, nullable: true })
  @JoinColumn({ name: 'author_id' })
  author!: TaskUser | null

  @Column({ type: 'text' })
  content!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
