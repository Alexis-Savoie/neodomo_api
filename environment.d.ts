
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ENV: 'dev' | 'prod'
        API_URL: string
        DB_URL: string
        PORT: number

        RESETEMAIL: string
        RESETPASSWORD: string

        STRIPESKEY: string

        JWT_TOKEN_SECRET_USER: string
        JWT_TOKEN_SECRET_ADMIN: string
      }
    }
  }
  
export {}
  