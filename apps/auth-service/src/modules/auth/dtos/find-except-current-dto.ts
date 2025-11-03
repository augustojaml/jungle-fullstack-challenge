import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

class FindExceptCurrentDto {
  @IsString()
  loggedUserId!: string
}

class FindExceptCurrentResponseDto {
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

  constructor(partial: Partial<FindExceptCurrentResponseDto>) {
    Object.assign(this, partial)
  }
}

export { FindExceptCurrentDto, FindExceptCurrentResponseDto }
