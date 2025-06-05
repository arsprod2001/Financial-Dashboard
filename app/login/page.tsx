"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiMail, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    setError('');

    
    if (!email) {
      setError('Veuillez entrer votre email');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }

    
    if (!password) {
      setError('Veuillez entrer votre mot de passe');
      return false;
    }

    if (!isLogin) {
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return false;
      }

      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return false;
      }

      if (!acceptTerms) {
        setError('Vous devez accepter les conditions d\'utilisation');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue');
      }

      
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>

          <div className="relative p-8">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-cyan-300 mb-2"
              >
                {isLogin ? 'Connexion' : 'Inscription'}
              </motion.h1>
              <p className="text-cyan-400/80">
                {isLogin
                  ? 'Entrez vos identifiants pour accéder à votre compte'
                  : 'Créez un compte pour commencer votre expérience'}
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-3 bg-red-900/40 text-red-300 rounded-lg border border-red-500/30"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-cyan-300 mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="votre@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-cyan-300 mb-2">Mot de passe</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="••••••••"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-1 text-xs text-cyan-400/60">Minimum 6 caractères</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <label className="block text-cyan-300 mb-2">Confirmer le mot de passe</label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                        aria-label={showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </motion.div>

                  <div className="flex items-start">
                    <button
                      type="button"
                      onClick={() => setAcceptTerms(!acceptTerms)}
                      className={`flex-shrink-0 h-5 w-5 mt-0.5 flex items-center justify-center rounded border ${acceptTerms
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-gray-600'
                        }`}
                      aria-checked={acceptTerms}
                      role="checkbox"
                    >
                      {acceptTerms && <FiCheck className="text-white text-xs" />}
                    </button>
                    <label className="ml-3 text-cyan-300 text-sm">
                      {"J'accepte les"} <a href="/terms" className="text-cyan-400 hover:underline">{"conditions d'utilisation"}</a>
                    </label>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center ${isLoading
                    ? 'bg-cyan-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                  }`}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Connexion...' : 'Inscription...'}
                  </>
                ) : isLogin ? 'Se connecter' : 'S\'inscrire'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-cyan-300">
                {isLogin ? 'Nouveau ici?' : 'Vous avez déjà un compte?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
                >
                  {isLogin ? 'Créer un compte' : 'Se connecter'}
                </button>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 text-center text-cyan-300 text-sm">
            © {new Date().getFullYear()} Votre Société. Tous droits réservés.
          </div>
        </motion.div>
      </div>
    </div>
  );
}