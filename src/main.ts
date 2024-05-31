import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
  const PORT = process.env.PORT || 4999
  const app = await NestFactory.create(AppModule, { cors: true })

  // app.use(corsMiddleware);

  // app.useGlobalPipes(new ValidationPipe());

  // app.enableCors({
  //   origin: [
  //     'https://client-todo-microsoft.vercel.app',
  //     'http://localhost:4200',
  //   ],
  //   methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
  //   credentials: true,
  //   optionsSuccessStatus: 204,
  //   allowedHeaders:
  //     'Origin, Authorization, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  // });

  app.setGlobalPrefix('api')

  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
  })
}

start()
