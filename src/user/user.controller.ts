import { Body, Controller, Get, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdatePersonalDataDto } from './dto/updatePersonalData.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { UserData } from './decorators/user-data.decorator'
import { User } from './user.model'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll()
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Put('update-personal-data')
	updatePersonalData(@Body() updatePersonalDataDto: UpdatePersonalDataDto, @UserData() { id }: Pick<User, 'id'>) {
		return this.userService.updatePersonalData(updatePersonalDataDto, id)
	}
}
