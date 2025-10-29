import { UserRepositoryPort } from '../contracts/user-repository.port'
import {
  RegisterUserRequestDto,
  toUserResponseDto,
  UserResponseDto,
} from '../dtos/register-user-dto'
import { UserEntity } from '../entities/user'

class RegisterUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new Error('User already exists')
    }

    const userEntity = UserEntity.create({ name, email, password })
    const userCreated = await this.userRepository.create(userEntity)
    return toUserResponseDto(userCreated)
  }
}

export { RegisterUseCase }
