import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { MailModule } from 'src/mail/mail.module'
import { TemporaryAuthDataModule } from 'src/temporary-auth-data/temporary-auth-data.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [forwardRef(() => AuthModule), SequelizeModule.forFeature([User]), MailModule, TemporaryAuthDataModule],
	exports: [UserService],
})
export class UserModule {}
