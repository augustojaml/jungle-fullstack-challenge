import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

import { RefreshTokenUseCase } from './refresh-token-use-case'

describe('RefreshTokenUseCase', () => {
  let sut: RefreshTokenUseCase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAuthService: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockUserRepository: any

  beforeEach(() => {
    mockAuthService = {
      verifyToken: vi.fn(),
    }

    mockUserRepository = {
      findById: vi.fn(),
    }

    sut = new RefreshTokenUseCase(mockAuthService, mockUserRepository)
  })

  it('should be able to refresh token', async () => {
    const fakeUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'avatar.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockAuthService.verifyToken.mockResolvedValue({ sub: '1' })
    mockUserRepository.findById.mockResolvedValue(fakeUser)

    const result = await sut.execute({ refreshToken: 'valid-token' })

    expect(result.user).toEqual(
      expect.objectContaining({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    )
  })

  it('should throw UnauthorizedError if token is invalid', async () => {
    mockAuthService.verifyToken.mockResolvedValue(null)

    await expect(
      sut.execute({ refreshToken: 'invalid-token' }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should throw ResourceNotFoundError if user is not found', async () => {
    mockAuthService.verifyToken.mockResolvedValue({ sub: '1' })
    mockUserRepository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({ refreshToken: 'valid-token' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
