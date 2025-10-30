import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string

  @Column({ type: 'varchar', length: 255 })
  password!: string

  // 👇 mapeia a coluna snake_case existente
  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  avatarUrl!: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
