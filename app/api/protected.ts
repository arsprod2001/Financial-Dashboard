import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateUser } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Vérifier la méthode HTTP - exemple avec GET mais peut être adapté
    if (req.method !== 'GET') {
      return res.setHeader('Allow', ['GET'])
               .status(405)
               .json({ error: 'Méthode non autorisée' })
    }

    // Authentifier l'utilisateur
    const { user, message } = await authenticateUser(req, res)
    
    if (!user) {
      // Journaliser les tentatives d'accès non autorisé
      console.warn(`Accès non autorisé à l'API protégée: ${message}`)
      return res.status(401).json({ error: 'Accès non autorisé' })
    }

    // Récupérer des données sensibles (simulé)
    const protectedData = {
      secret: 'Données confidentielles',
      accountBalance: 12543.32,
      lastLogin: new Date().toISOString()
    }

    // Journaliser l'accès réussi
    console.log(`Accès autorisé à l'API protégée par l'utilisateur ${user.id}`)

    // Réponse avec les données protégées
    return res.status(200).json({
      ...protectedData,
      user: {
        id: user.id,
        email: user.email
      }
    })

  } catch (error) {
    console.error('Erreur endpoint protégé:', error)
    return res.status(500).json({ 
      error: 'Erreur serveur lors du traitement de la requête' 
    })
  }
}