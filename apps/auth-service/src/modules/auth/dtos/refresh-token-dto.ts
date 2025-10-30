// auth.dto.ts
import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

export class RefreshTokenParamsDto {
  @IsString()
  refreshToken!: string
}

export class RefreshTokenResponseDto {
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

  constructor(partial: Partial<RefreshTokenResponseDto>) {
    Object.assign(this, partial)
  }
}
