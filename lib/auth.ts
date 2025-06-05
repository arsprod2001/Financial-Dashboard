import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET est manquant dans les variables d\'environnement')
}

export const createToken = (userId: number): string => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '1d' }
  )
}

export const authenticateUser = async (
  req: NextApiRequest, 
  res: NextApiResponse
): Promise<{ user: { id: number; email: string } | null; message: string | null }> => {
  
  const token = req.cookies.token
  
  if (!token) {
    return { 
      user: null, 
      message: 'Authentification requise' 
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { 
        id: true, 
        email: true,
      }
    })

    if (!user) {
      console.warn(`Token valide mais utilisateur introuvable: ${decoded.userId}`)
      return { 
        user: null, 
        message: 'Compte utilisateur introuvable' 
      }
    }

    return { 
      user, 
      message: null 
    }
    
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn('Token expiré:', token)
      return { 
        user: null, 
        message: 'Session expirée' 
      }
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Token invalide:', token, error.message)
      return { 
        user: null, 
        message: 'Token invalide' 
      }
    }

    console.error('Erreur d\'authentification:', error)
    return { 
      user: null, 
      message: 'Erreur d\'authentification' 
    }
  }
}

export const protectAPI = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, message } = await authenticateUser(req, res)
    
    if (!user) {
      return res.status(401).json({ error: message || 'Non autorisé' })
    }
    
    ;(req as any).user = user
    
    return handler(req, res)
  }
}