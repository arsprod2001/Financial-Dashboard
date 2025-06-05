{/*
  import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const checkDatabaseConnection = async (client: PrismaClient) => {
  try {
    await client.$connect()
    console.log('✅ Connecté à la base de données avec succès')
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données:', error)
    process.exit(1)
  }
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error']
  })

if (process.env.NODE_ENV === 'production') {
  checkDatabaseConnection(prisma).catch((error) => {
    console.error('Erreur critique de connexion DB:', error)
    process.exit(1)
  })
}

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()

  console.log(
    `🕒 Requête ${params.model}.${params.action} exécutée en ${after - before}ms`
  )
  return result
})

const shutdown = async () => {
  await prisma.$disconnect()
  console.log('🔌 Prisma Client déconnecté proprement')
  process.exit(0)
}

process.on('beforeExit', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

export default prisma
*/
}