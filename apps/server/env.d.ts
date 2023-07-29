/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
    DATABASE_URL: string
    PORT: string
    JWT_ACCESS_SECRET: string
    JWT_REFRESH_SECRET: string
    JWT_ADMIN_ACCESS_SECRET: string
    JWT_ADMIN_REFRESH_SECRET: string
    CLIENT_URL: string
    STRIPE_PUBLIC_KEY: string
    STRIPE_SECRET_KEY: string
    STRIPE_SIG: string
  }
}