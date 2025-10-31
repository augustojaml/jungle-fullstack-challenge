// auth.dto.ts
import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

class MeUserDto {
  @IsString()
  userId!: string
}

class MeUserResponseDto {
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

  constructor(partial: Partial<MeUserResponseDto>) {
    Object.assign(this, partial)
  }
}

export { MeUserDto, MeUserResponseDto }
