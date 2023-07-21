/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
    DATABASE_URL: string
    PORT: string
    STRIPE_PUBLIC_KEY: string
    STRIPE_SECRET_KEY: string
  }
}