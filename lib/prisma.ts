import { PrismaClient } from '@prisma/client'

// Déclaration dans l'espace global pour TypeScript
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Vérification de la connexion à la base de données
const checkDatabaseConnection = async (client: PrismaClient) => {
  try {
    await client.$connect()
    console.log('✅ Connecté à la base de données avec succès')
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données:', error)
    process.exit(1)
  }
}

// Création de l'instance Prisma
const prisma: PrismaClient = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? 
    ['query', 'error', 'warn'] : 
    ['error']
})

// Vérification de la connexion seulement en production
if (process.env.NODE_ENV === 'production') {
  checkDatabaseConnection(prisma).catch((error) => {
    console.error('Erreur critique de connexion DB:', error)
    process.exit(1)
  })
}

// Stockage dans global pour éviter les fuites de mémoire en développement
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Middleware pour journalisation des requêtes
prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()
  
  console.log(`Requête ${params.model}.${params.action} exécutée en ${after - before}ms`)
  return result
})

// Fermeture propre lors de l'arrêt de l'application
const shutdown = async () => {
  await prisma.$disconnect()
  console.log('Prisma Client déconnecté proprement')
  process.exit(0)
}

process.on('beforeExit', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

export default prisma