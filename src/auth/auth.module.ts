import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [],
  exports: [AuthService],
})
export class AuthModule {}
