import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../user.model'

type UserKeys = keyof User

export const UserData = createParamDecorator((data: UserKeys, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const user = request.user

	return data ? user?.[data] : user
})
