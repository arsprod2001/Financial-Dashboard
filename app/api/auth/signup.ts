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
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { email, password } = req.body

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' })
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword 
      }
    })

    // Génération du token JWT
    const token = createToken(user.id)

    // Configuration du cookie sécurisé
    res.setHeader('Set-Cookie', [
      `token=${token}; ` +
      `HttpOnly; ` +
      `Path=/; ` +
      `Max-Age=${60 * 60 * 24}; ` + // 1 jour
      `SameSite=Lax; ` +
      `${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`
    ])

    // Réponse sans le mot de passe
    return res.status(201).json({ 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    })
    
  } catch (error) {
    console.error('Erreur inscription:', error)
    return res.status(500).json({ 
      error: 'Erreur serveur lors de la création du compte' 
    })
  }
}