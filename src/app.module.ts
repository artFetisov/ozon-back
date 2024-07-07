import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { SequelizeModule } from '@nestjs/sequelize'
import * as pg from 'pg'
import { User } from './user/user.model'
import { MailModule } from './mail/mail.module'
import { TemporaryAuthDataModule } from './temporary-auth-data/temporary-auth-data.module'
import { TemporaryAuthData } from './temporary-auth-data/temporary-auth-data.model'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './token/token.module'
import { Token } from './token/token.model'
import { FilesModule } from './files/files.module'
import { CategoryModule } from './category/category.module'
import { Category } from './category/category.model'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			dialectModule: pg,
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, TemporaryAuthData, Token, Category],
			autoLoadModels: true,
		}),
		UserModule,
		MailModule,
		AuthModule,
		TemporaryAuthDataModule,
		TokenModule,
		FilesModule,
		CategoryModule,
	],
})
export class AppModule {}
