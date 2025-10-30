// auth.dto.ts
import { Exclude, Expose, Type } from 'class-transformer'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string
}

export class LoginUserResponseDto {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() email!: string
  @Expose() avatarUrl!: string | null

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Exclude() password!: string

  constructor(partial: Partial<LoginUserResponseDto>) {
    Object.assign(this, partial)
  }
}

/** wrapper para { user, token } */
