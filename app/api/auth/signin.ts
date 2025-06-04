import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { createToken } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({
      error: 'Méthode non autorisée'
    })
  }

  const { email, password } = req.body

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email et mot de passe requis' 
    })
  }

  try {
    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({ 
      where: { email } 
    })
    
    // Vérification des identifiants
    if (!user) {
      // Retarder volontairement pour éviter les attaques de timing
      await bcrypt.compare(password, '$2a$12$fakehashforsecurity')
      return res.status(401).json({ 
        error: 'Identifiants invalides' 
      })
    }

    // Comparaison du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Identifiants invalides' 
      })
    }

    // Génération du token JWT
    const token = createToken(user.id)

    // Configuration du cookie sécurisé
    const cookieOptions = [
      `token=${token}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${60 * 60 * 24}`, // 1 jour
      'SameSite=Lax'
    ]

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.push('Secure')
    }

    res.setHeader('Set-Cookie', cookieOptions.join('; '))
    
    // Réponse sans informations sensibles
    return res.status(200).json({ 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    })
    
  } catch (error) {
    console.error('Erreur connexion:', error)
    return res.status(500).json({ 
      error: 'Erreur serveur lors de la connexion' 
    })
  }
}