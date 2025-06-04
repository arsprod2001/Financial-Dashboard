import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la méthode HTTP (POST recommandé pour les actions de modification)
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.setHeader('Allow', ['GET', 'POST'])
             .status(405)
             .json({ error: 'Méthode non autorisée' })
  }

  try {
    // Créer le header Set-Cookie avec expiration immédiate
    const cookieOptions = [
      'token=',
      'HttpOnly',
      'Path=/',
      'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'SameSite=Lax'
    ]

    // Ajouter le flag Secure en production
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.push('Secure')
    }

    res.setHeader('Set-Cookie', cookieOptions.join('; '))
    
    return res.status(200).json({ 
      message: 'Déconnecté avec succès' 
    })

  } catch (error) {
    console.error('Erreur déconnexion:', error)
    return res.status(500).json({ 
      error: 'Erreur serveur lors de la déconnexion' 
    })
  }
}