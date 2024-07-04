import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile, emptyDir } from 'fs-extra'
import { UserService } from 'src/user/user.service'
import { ISaveAvatarResponse } from './types/file.types'

@Injectable()
export class FilesService {
	constructor(private readonly userService: UserService) {}
	async saveUserPhoto(file: Express.Multer.File, id: number): Promise<ISaveAvatarResponse> {
		const uploadFolder = `${path}/uploads/avatar/${id}`

		await ensureDir(uploadFolder)

		await emptyDir(uploadFolder)

		await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)

		const user = await this.userService.getUserById(id)

		if (!user) {
			throw new HttpException('Неверный данные', HttpStatus.BAD_REQUEST)
		}

		const newAvatar = `/uploads/avatar/${user.id}/${file.originalname}`

		user.avatar = newAvatar
		await user.save()

		return { avatar: newAvatar }
	}
}
