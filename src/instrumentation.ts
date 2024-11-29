export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Migrating database')
    const { migrate } = await import('drizzle-orm/node-postgres/migrator')
    const { db } = await import('./db/connection')
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('Database migrated')
  }
}
