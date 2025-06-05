{/** 
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET manquant ou trop faible dans les variables d\'environnement (min 32 caractères)')
}

interface JwtPayload {
  userId: number
}

export interface AuthenticatedUser {
  id: number
  email: string
}

interface AuthResult {
  user: AuthenticatedUser | null
  message: string | null
}

export const createToken = (userId: number): string => {
  return jwt.sign(
    { userId }, 
    JWT_SECRET, 
    { expiresIn: '1d' }
  )
}

export const authenticateUser = async (
  req: NextApiRequest, 
  res: NextApiResponse
): Promise<AuthResult> => {
  
  const token = req.cookies.token
  
  if (!token) {
    return { 
      user: null, 
      message: 'Authentification requise' 
    }
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { 
        id: true, 
        email: true,
      }
    })

    if (!user) {
      console.warn(`Token valide mais utilisateur introuvable: ${decoded.userId}`)
      res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly')
      return { 
        user: null, 
        message: 'Compte utilisateur introuvable' 
      }
    }

    return { 
      user, 
      message: null 
    }
    
  } catch (error: unknown) {
    let message = 'Erreur d\'authentification'
    
    if (error instanceof jwt.TokenExpiredError) {
      console.warn('Token expiré:', token)
      message = 'Session expirée'
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Token invalide:', token, error.message)
      message = 'Token invalide'
      
      res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly')
    } else if (error instanceof Error) {
      console.error('Erreur d\'authentification:', error.message)
    }

    return { 
      user: null, 
      message 
    }
  }
}

export interface AuthenticatedRequest extends NextApiRequest {
  user: AuthenticatedUser
}

export type ProtectedApiHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => unknown | Promise<unknown>

export const protectAPI = (handler: ProtectedApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, message } = await authenticateUser(req, res)
    
    if (!user) {
      return res.status(401).json({ error: message || 'Non autorisé' })
    }
    
    const authenticatedReq = req as AuthenticatedRequest
    authenticatedReq.user = user
    
    return handler(authenticatedReq, res)
  }
}

*/}