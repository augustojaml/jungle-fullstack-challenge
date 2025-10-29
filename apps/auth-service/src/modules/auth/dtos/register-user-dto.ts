// auth.dto.ts  (ou users.dto.ts — como preferir)

import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsString, Length, MinLength } from 'class-validator'

class RegisterUserDto {
  @IsString()
  @Length(3, 80)
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string
}

class RegisterUserResponseDto {
  @Expose() id!: string
  @Expose() name!: string
  @Expose() email!: string
  @Expose() avatarUrl!: string | null
  @Expose() createdAt!: Date
  @Expose() updatedAt!: Date

  @Exclude() password!: string

  constructor(partial: Partial<RegisterUserResponseDto>) {
    Object.assign(this, partial)
  }
}

export { RegisterUserDto, RegisterUserResponseDto }
