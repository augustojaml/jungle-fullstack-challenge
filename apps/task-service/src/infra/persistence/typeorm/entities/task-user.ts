// task-user-entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Task } from './task'

@Entity('users')
class TaskUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string

  @Column({ type: 'varchar', length: 255 })
  password!: string

  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  avatarUrl!: string | null

  @OneToMany(() => Task, (task) => task.creator)
  createdTasks!: Task[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}

export { TaskUser }
