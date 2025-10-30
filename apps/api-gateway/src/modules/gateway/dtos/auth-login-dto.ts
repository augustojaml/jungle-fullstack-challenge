import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

class AuthLoginParamsDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string

  @ApiProperty({
    example: '123456',
    description: 'User password (minimum 6 characters)',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string
}

export { AuthLoginParamsDto }
