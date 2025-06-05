{/** 
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

  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  try {
   
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' })
    }

    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword 
      }
    })

    
    const token = createToken(user.id)

    
    res.setHeader('Set-Cookie', [
      `token=${token}; ` +
      `HttpOnly; ` +
      `Path=/; ` +
      `Max-Age=${60 * 60 * 24}; ` + // 1 jour
      `SameSite=Lax; ` +
      `${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`
    ])

    
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
  */}