import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User
  ) {}

  async getAll() {
    return this.userRepository.findAll({ include: { all: true } })
  }

  // async createUser() {
  //   return this.userRepository.create({})
  // }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    })
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
    })
  }
}
