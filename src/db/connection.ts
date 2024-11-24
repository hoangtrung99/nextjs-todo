// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres'

const connectionString = process.env.DATABASE_URL!
export const db = drizzle(connectionString)
