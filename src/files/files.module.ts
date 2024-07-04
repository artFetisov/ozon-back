import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'
import { UserModule } from 'src/user/user.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads',
		}),
		UserModule,
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
