import { Module } from '@nestjs/common'
import { TemporaryAuthDataService } from './temporary-auth-data.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TemporaryAuthData } from './temporary-auth-data.model'

@Module({
  providers: [TemporaryAuthDataService],
  imports: [SequelizeModule.forFeature([TemporaryAuthData])],
})
export class TemporaryAuthDataModule {}
