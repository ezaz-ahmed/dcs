/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test' | string
    DATABASE_URL: string
  }
}