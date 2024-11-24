import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from './connection'

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' })
