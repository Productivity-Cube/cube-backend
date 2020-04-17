import * as assert from 'assert'
import * as dotenv from 'dotenv'
dotenv.config() // use here as atlas fails otherwise with missing env variables

export const DATABASE_CONNECTION_URL: string = <string> process.env.DATABASE_CONNECTION_URL

assert(DATABASE_CONNECTION_URL.length > 0, 'DATABASE_CONNECTION_URL env var must be set')
