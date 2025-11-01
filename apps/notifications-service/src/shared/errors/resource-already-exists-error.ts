import { BaseError, ErrorCodes } from '@repo/types'

export class ResourceAlreadyExistsError extends BaseError {
  constructor() {
    super('Resource already exists', 409, ErrorCodes.RESOURCE_ALREADY_EXISTS)
    this.name = 'ResourceAlreadyExistsError'
  }
}
