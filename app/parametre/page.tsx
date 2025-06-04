"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiLock, FiBell, FiCreditCard, FiDatabase, FiShield, FiGlobe, FiMail, FiTrash2, FiLogOut, FiChevronDown, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

const SettingsPage = () => {
  // États pour les différents paramètres
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: false,
    promotions: false
  });
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    passwordChangeRequired: false
  });
  const [billing, setBilling] = useState({
    plan: 'premium',
    paymentMethod: 'visa',
    autoRenew: true
  });
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('dark');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('sk_live_51Hq9Z8K3d8p7g2F8w7v5x9zA4b3c6d7e8f9g0h1i2j3k4l5');

  // Fonction pour basculer les notifications
  const toggleNotification = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  // Fonction pour basculer la sécurité
  const toggleSecurity = (type) => {
    setSecurity({
      ...security,
      [type]: !security[type]
    });
  };

  // Fonction pour changer le plan
  const changePlan = (plan) => {
    setBilling({
      ...billing,
      plan
    });
  };

  // Fonction pour confirmer la suppression du compte
  const confirmAccountDeletion = () => {
    setDeleteConfirm(true);
    setTimeout(() => setDeleteConfirm(false), 5000);
  };

  // Fonction pour supprimer le compte
  const deleteAccount = () => {
    // Logique de suppression du compte
    alert('Votre compte a été supprimé avec succès');
    setDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Paramètres du Compte
          </h1>
          <p className="text-cyan-400/80 mt-2">
            Gérez vos préférences, sécurité et abonnement
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Navigation latérale */}
          <div className="md:w-1/4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <nav className="space-y-1">
              {[
                { id: 'profile', icon: <FiUser />, label: 'Profil' },
                { id: 'security', icon: <FiLock />, label: 'Sécurité' },
                { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
                { id: 'billing', icon: <FiCreditCard />, label: 'Abonnement & Facturation' },
                { id: 'api', icon: <FiDatabase />, label: 'API & Intégrations' },
                { id: 'preferences', icon: <FiGlobe />, label: 'Préférences' },
                { id: 'danger', icon: <FiTrash2 />, label: 'Zone dangereuse' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'hover:bg-gray-700/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <FiUser className="text-gray-900" />
                </div>
                <div>
                  <div className="font-medium">Admin User</div>
                  <div className="text-sm text-cyan-400/60">admin@example.com</div>
                </div>
              </div>
              <button className="w-full mt-4 p-2 rounded-lg flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700/80 border border-gray-700 transition-all">
                <FiLogOut /> Déconnexion
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:w-3/4">
            {/* Section Profil */}
            {activeTab === 'profile' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiUser /> Informations du profil
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cyan-300 mb-2">Nom complet</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@example.com"
                      className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 mb-2">Entreprise</label>
                    <input
                      type="text"
                      defaultValue="CyberCorp Inc."
                      className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-300 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="+33 6 12 34 56 78"
                      className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-cyan-300 mb-2">Bio</label>
                  <textarea
                    defaultValue="Administrateur système et expert en cybersécurité"
                    rows="3"
                    className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  ></textarea>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            )}

            {/* Section Sécurité */}
            {activeTab === 'security' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiLock /> Sécurité du compte
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Authentification à deux facteurs</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Ajoutez une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleSecurity('twoFactor')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          security.twoFactor ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                    {security.twoFactor && (
                      <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <FiCheck /> Authentification à deux facteurs activée
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg border border-gray-600">
                            Configurer l'authentificateur
                          </button>
                          <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg border border-gray-600">
                            Gérer les appareils
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Alertes de connexion</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Recevez une notification lorsqu'une nouvelle connexion est détectée
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleSecurity('loginAlerts')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          security.loginAlerts ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Changement de mot de passe requis</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Vous devrez changer votre mot de passe lors de votre prochaine connexion
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleSecurity('passwordChangeRequired')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          security.passwordChangeRequired ? 'bg-amber-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            security.passwordChangeRequired ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium text-lg text-cyan-300 mb-4">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Paris, France</div>
                          <div className="text-sm text-cyan-400/60">
                            Chrome sur Windows • Actuellement actif
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Dernière activité: il y a 2 minutes
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                          Déconnecter
                        </button>
                      </div>
                      
                      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 flex justify-between items-center">
                        <div>
                          <div className="font-medium">New York, États-Unis</div>
                          <div className="text-sm text-cyan-400/60">
                            Safari sur macOS • Actif il y a 3 jours
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Dernière activité: 15 oct. 2023
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                          Déconnecter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiBell /> Préférences de notification
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Notifications par email</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Recevez des notifications importantes par email
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleNotification('email')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          notifications.email ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            notifications.email ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Notifications push</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Recevez des notifications sur votre appareil
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleNotification('push')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          notifications.push ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            notifications.push ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Rapport hebdomadaire</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Recevez un résumé hebdomadaire de votre activité
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleNotification('weeklyReport')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          notifications.weeklyReport ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg text-cyan-300">Offres promotionnelles</h3>
                        <p className="text-cyan-400/60 mt-1">
                          Recevez des offres spéciales et des mises à jour
                        </p>
                      </div>
                      <div 
                        onClick={() => toggleNotification('promotions')}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                          notifications.promotions ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            notifications.promotions ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium text-lg text-cyan-300 mb-4">Configuration des notifications par email</h3>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-4 mb-4">
                        <FiMail className="text-xl text-cyan-400" />
                        <div>
                          <div className="font-medium">admin@example.com</div>
                          <div className="text-sm text-cyan-400/60">Adresse email principale</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-cyan-300 mb-2">Ajouter une adresse email supplémentaire</label>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="email@example.com"
                            className="flex-1 bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                          />
                          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Abonnement et Facturation */}
            {activeTab === 'billing' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiCreditCard /> Abonnement & Facturation
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-bold text-cyan-300 text-xl mb-2">Votre abonnement</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                      Premium
                    </div>
                    <ul className="space-y-2 text-cyan-400/80 mb-6">
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Accès complet aux fonctionnalités
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Support prioritaire
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> 50 Go de stockage
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Rapports avancés
                      </li>
                    </ul>
                    <button 
                      onClick={() => changePlan('premium')}
                      className={`w-full py-2 rounded-lg border ${
                        billing.plan === 'premium'
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {billing.plan === 'premium' ? 'Plan actuel' : 'Passer à Premium'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-bold text-cyan-300 text-xl mb-2">Plan Professionnel</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-4">
                      49€<span className="text-lg">/mois</span>
                    </div>
                    <ul className="space-y-2 text-cyan-400/80 mb-6">
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Toutes les fonctionnalités Premium
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Support 24/7
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Stockage illimité
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Intégrations personnalisées
                      </li>
                    </ul>
                    <button 
                      onClick={() => changePlan('pro')}
                      className={`w-full py-2 rounded-lg border ${
                        billing.plan === 'pro'
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {billing.plan === 'pro' ? 'Plan actuel' : 'Passer à Professionnel'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-bold text-cyan-300 text-xl mb-2">Plan Entreprise</h3>
                    <div className="text-cyan-400 text-xl mb-4">Prix personnalisé</div>
                    <ul className="space-y-2 text-cyan-400/80 mb-6">
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Toutes les fonctionnalités Professionnel
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Gestion multi-comptes
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> SLA 99.9%
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="text-green-400" /> Formation et implémentation
                      </li>
                    </ul>
                    <button 
                      onClick={() => changePlan('enterprise')}
                      className={`w-full py-2 rounded-lg border ${
                        billing.plan === 'enterprise'
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {billing.plan === 'enterprise' ? 'Plan actuel' : 'Contacter les ventes'}
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-cyan-300 text-lg">Méthode de paiement</h3>
                    <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                      Modifier
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-md flex items-center justify-center">
                      <FiCreditCard className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Carte Visa se terminant par 4242</div>
                      <div className="text-sm text-cyan-400/60">Expire le 12/2025</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <div 
                      onClick={() => setBilling({...billing, autoRenew: !billing.autoRenew})}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
                        billing.autoRenew ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                          billing.autoRenew ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </div>
                    <span>Renouvellement automatique</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6">
                  <h3 className="font-bold text-cyan-300 text-lg mb-4">Historique de facturation</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cyan-500/30">
                          <th className="text-left pb-3 text-cyan-400">Date</th>
                          <th className="text-left pb-3 text-cyan-400">Description</th>
                          <th className="text-right pb-3 text-cyan-400">Montant</th>
                          <th className="text-right pb-3 text-cyan-400">Statut</th>
                          <th className="text-right pb-3 text-cyan-400">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                          <td className="py-3">15 oct. 2023</td>
                          <td>Abonnement Premium</td>
                          <td className="text-right">29,00 €</td>
                          <td className="text-right text-green-400">Payé</td>
                          <td className="text-right">
                            <button className="text-cyan-400 hover:text-cyan-300">
                              Télécharger
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                          <td className="py-3">15 sept. 2023</td>
                          <td>Abonnement Premium</td>
                          <td className="text-right">29,00 €</td>
                          <td className="text-right text-green-400">Payé</td>
                          <td className="text-right">
                            <button className="text-cyan-400 hover:text-cyan-300">
                              Télécharger
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                          <td className="py-3">15 août 2023</td>
                          <td>Abonnement Premium</td>
                          <td className="text-right">29,00 €</td>
                          <td className="text-right text-green-400">Payé</td>
                          <td className="text-right">
                            <button className="text-cyan-400 hover:text-cyan-300">
                              Télécharger
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Section API et Intégrations */}
            {activeTab === 'api' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiDatabase /> API & Intégrations
                </h2>
                
                <div className="mb-8">
                  <h3 className="font-bold text-cyan-300 text-lg mb-4">Clé API</h3>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 flex justify-between items-center">
                    <div>
                      {showApiKey ? (
                        <div className="font-mono">{apiKey}</div>
                      ) : (
                        <div className="flex gap-1">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          ))}
                        </div>
                      )}
                      <div className="text-sm text-cyan-400/60 mt-2">
                        Utilisez cette clé pour accéder à l'API
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700"
                      >
                        {showApiKey ? 'Masquer' : 'Afficher'}
                      </button>
                      <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                        Régénérer
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-amber-400">
                    <FiAlertCircle className="inline mr-1" />
                    Gardez votre clé API secrète - ne la partagez jamais en public
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold text-cyan-300 text-lg mb-4">Applications connectées</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="font-bold">G</span>
                        </div>
                        <div>
                          <div className="font-medium">Google Workspace</div>
                          <div className="text-sm text-cyan-400/60">
                            Accès à Google Drive et Gmail
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                        Déconnecter
                      </button>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span className="font-bold">S</span>
                        </div>
                        <div>
                          <div className="font-medium">Slack</div>
                          <div className="text-sm text-cyan-400/60">
                            Notifications et intégration d'équipe
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                        Déconnecter
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-cyan-300 text-lg mb-4">Intégrations disponibles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Zapier', color: 'from-blue-500 to-purple-600', icon: 'Z' },
                      { name: 'Stripe', color: 'from-purple-500 to-indigo-600', icon: 'S' },
                      { name: 'Mailchimp', color: 'from-amber-500 to-yellow-600', icon: 'M' },
                      { name: 'Salesforce', color: 'from-blue-400 to-cyan-500', icon: 'S' }
                    ].map((app, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center`}>
                          <span className="font-bold text-xl">{app.icon}</span>
                        </div>
                        <div>
                          <div className="font-medium">{app.name}</div>
                          <button className="mt-2 px-3 py-1 text-sm bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                            Connecter
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section Préférences */}
            {activeTab === 'preferences' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <FiGlobe /> Préférences de l'application
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-cyan-300 text-lg mb-4">Langue</h3>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        <option value="it">Italiano</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400">
                        <FiChevronDown />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-cyan-300 text-lg mb-4">Thème</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border flex flex-col items-center ${
                          theme === 'dark'
                            ? 'bg-cyan-500/10 border-cyan-500/50'
                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-2"></div>
                        <span>Sombre</span>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border flex flex-col items-center ${
                          theme === 'light'
                            ? 'bg-amber-500/10 border-amber-500/50'
                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full mb-2"></div>
                        <span>Clair</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-cyan-300 text-lg mb-4">Densité d'affichage</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-3 rounded-lg border bg-gray-800 border-gray-700 hover:bg-gray-700 flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                          <div className="w-3 h-3 bg-gray-700 rounded"></div>
                          <div className="w-3 h-3 bg-gray-700 rounded"></div>
                        </div>
                        <span className="text-sm">Compact</span>
                      </button>
                      <button className="p-3 rounded-lg border bg-gray-800 border-cyan-500/50 flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                          <div className="w-3 h-3 bg-gray-700 rounded"></div>
                        </div>
                        <span className="text-sm">Confortable</span>
                      </button>
                      <button className="p-3 rounded-lg border bg-gray-800 border-gray-700 hover:bg-gray-700 flex flex-col items-center">
                        <div className="flex gap-1 mb-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                          <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                        </div>
                        <span className="text-sm">Espacé</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-cyan-300 text-lg mb-4">Zone horaire</h3>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      >
                        <option>(UTC+01:00) Paris, Bruxelles</option>
                        <option>(UTC-05:00) New York</option>
                        <option>(UTC+00:00) Londres</option>
                        <option>(UTC+08:00) Pékin</option>
                        <option>(UTC+09:00) Tokyo</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400">
                        <FiChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-bold text-cyan-300 text-lg mb-4">Paramètres avancés</h3>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="font-medium">Mode développeur</div>
                        <div className="text-sm text-cyan-400/60">
                          Afficher les outils de développement et les logs
                        </div>
                      </div>
                      <div 
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors bg-gray-600`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform translate-x-1`}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Partage de données anonymes</div>
                        <div className="text-sm text-cyan-400/60">
                          Aidez-nous à améliorer le produit
                        </div>
                      </div>
                      <div 
                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors bg-green-500`}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform translate-x-6`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Zone dangereuse */}
            {activeTab === 'danger' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-6">
                <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                  <FiTrash2 /> Zone dangereuse
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 text-lg mb-2">Exporter vos données</h3>
                    <p className="text-cyan-400/60 mb-4">
                      Téléchargez une copie de toutes vos données au format JSON ou CSV
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                        Exporter en JSON
                      </button>
                      <button className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
                        Exporter en CSV
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 text-lg mb-2">Désactiver votre compte</h3>
                    <p className="text-cyan-400/60 mb-4">
                      Votre compte sera désactivé temporairement et vous pourrez le réactiver à tout moment
                    </p>
                    <button className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30 hover:bg-amber-500/20">
                      Désactiver le compte
                    </button>
                  </div>
                  
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 text-lg mb-2">Supprimer définitivement votre compte</h3>
                    <p className="text-cyan-400/60 mb-4">
                      Cette action est irréversible. Toutes vos données seront supprimées de nos serveurs.
                    </p>
                    
                    {deleteConfirm ? (
                      <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <p className="text-red-400 mb-3">
                          Êtes-vous absolument sûr de vouloir supprimer votre compte?
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={deleteAccount}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30"
                          >
                            Oui, supprimer définitivement
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(false)}
                            className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={confirmAccountDeletion}
                        className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/20"
                      >
                        Supprimer définitivement mon compte
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;