import { BaseError, ErrorCodes } from '@repo/types'

export class UnauthorizedError extends BaseError {
  constructor() {
    super('Unauthorized', 401, ErrorCodes.UNAUTHORIZED)
    this.name = 'UnauthorizedError'
  }
}
