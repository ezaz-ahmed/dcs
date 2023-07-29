import { NestFactory } from '@nestjs/core'
import { LogLevel, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const allowedOrigins: string[] = [process.env.CLIENT_URL]

async function bootstrap() {
  const prodLogLevels: LogLevel[] = ['log', 'error', 'warn']
  const devLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose']

  const logLevels =
    process.env.NODE_ENV === 'production' ? prodLogLevels : devLogLevels

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
    rawBody: true
  })

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}

void bootstrap()
