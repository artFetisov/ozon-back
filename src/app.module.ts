import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { SequelizeModule } from '@nestjs/sequelize'
import * as pg from 'pg'
import { User } from './user/user.model'
import { MailModule } from './mail/mail.module'
import { TemporaryAuthDataModule } from './temporary-auth-data/temporary-auth-data.module'
import { TemporaryAuthData } from './temporary-auth-data/temporary-auth-data.model'

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
      models: [User, TemporaryAuthData],
      autoLoadModels: true,
    }),
    UserModule,
    MailModule,
    TemporaryAuthDataModule,
  ],
})
export class AppModule {}
