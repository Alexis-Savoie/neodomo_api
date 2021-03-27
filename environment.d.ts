
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ENV: 'dev' | 'prod'
        API_URL: string
        DB_URL: string

        RESETEMAIL: string
        RESETPASSWORD: string

        STRIPESKEY: string
        ADMINKEY: string

        JWT_ACCESS_TOKEN_EXP: number
        JWT_REFRESH_TOKEN_EXP: number
        JWT_TOKEN_SECRET: string
      }
    }
  }
  

  export {}
  