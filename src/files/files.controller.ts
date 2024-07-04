import { Controller, Post, Query, HttpCode, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { UserData } from 'src/user/decorators/user-data.decorator'
import { User } from 'src/user/user.model'
import { ISaveAvatarResponse } from './types/file.types'

@Controller('files')
export class FilesController {
	constructor(private readonly fileService: FilesService) {}

	@Post('user-photo')
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('image'))
	uploadUserPhoto(
		@UploadedFile() file: Express.Multer.File,
		@UserData() { id }: Pick<User, 'id'>
	): Promise<ISaveAvatarResponse> {
		return this.fileService.saveUserPhoto(file, id)
	}
}
