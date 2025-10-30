import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class RefreshTokenParamsDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'The refresh token used to generate a new access token',
  })
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken!: string
}

export { RefreshTokenParamsDto }
