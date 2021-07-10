import * as dotenv from 'dotenv'

dotenv.config({ path: './../.env' })
/**
  * The mongodb url
 */
export const DB_URL = process.env.DB_URL || ""
/**
 * The name of the database
 */
export const DB_NAME = process.env.DB_NAME || "Invoice"
/**
 * The port the server will listen to
 */
export const PORT = process.env.PORT || 3000
