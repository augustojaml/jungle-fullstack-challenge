import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

class AuthRegisterParamsDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString({ message: 'Name must be a string' })
  name!: string

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string

  @ApiProperty({
    example: '123456',
    description: 'Password (minimum 6 characters)',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string
}

export { AuthRegisterParamsDto }
