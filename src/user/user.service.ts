import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdatePersonalDataDto } from './dto/updatePersonalData.dto'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

	async getAll() {
		return this.userRepository.findAll({ include: { all: true } })
	}

	async createUser({ email }: CreateUserDto) {
		return this.userRepository.create({ email })
	}

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

	async updatePersonalData(dto: UpdatePersonalDataDto, id: number) {
		const user = await this.getUserById(id)

		await user?.update({ ...dto })

		return user
	}
}
