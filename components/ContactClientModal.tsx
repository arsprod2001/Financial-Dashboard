import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiX, FiMail, FiPhone, FiCalendar, FiPaperclip, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

interface ClientContactInfo {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  lastContact?: string;
}

interface ContactClientModalProps {
  client?: ClientContactInfo;
  onClose: () => void;
}

type ContactType = 'email' | 'phone' | 'meeting';

interface FormDataState {
  subject: string;
  contactType: ContactType;
  message: string;
  attachment: File | null;
}

const ContactClientModal = ({ client, onClose }: ContactClientModalProps) => {
  const [formData, setFormData] = useState<FormDataState>({
    subject: '',
    contactType: 'email',
    message: '',
    attachment: null
  });
  
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="
        relative max-w-2xl w-full
        bg-gray-900 border border-cyan-500/30
        rounded-xl shadow-2xl
        neon-glow
        overflow-hidden
      ">
        <div className="p-6 border-b border-cyan-500/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
              <FiUser className="mr-2" />
              Contacter {client?.name || 'le client'}
            </h2>
            <p className="text-cyan-400/60 mt-1">Envoyez un message ou planifiez un rendez-vous</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <FiSend size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-400">Message envoyé !</h3>
              <p className="text-cyan-400/80 mt-2">Votre message a été transmis avec succès</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/40 p-4 rounded-lg border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3">Informations client</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-cyan-400/60 text-sm">Nom</p>
                      <p className="text-cyan-300">{client?.name || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-cyan-400/60 text-sm">Email</p>
                      <p className="text-cyan-300">{client?.email || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-cyan-400/60 text-sm">Téléphone</p>
                      <p className="text-cyan-300">{client?.phone || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-cyan-400/60 text-sm">Dernier contact</p>
                      <p className="text-cyan-300">{client?.lastContact || 'Non spécifié'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-cyan-400 mb-2">Sujet</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Objet du message"
                      className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-400 mb-2">Type de contact</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'email', label: 'Email', icon: <FiMail /> },
                        { value: 'phone', label: 'Téléphone', icon: <FiPhone /> },
                        { value: 'meeting', label: 'Rendez-vous', icon: <FiCalendar /> }
                      ].map((type) => (
                        <label 
                          key={type.value}
                          className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.contactType === type.value
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                              : 'bg-gray-800/40 border-cyan-500/20 text-cyan-400/60 hover:bg-cyan-500/10'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactType"
                            value={type.value}
                            checked={formData.contactType === type.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center">
                            <span className="text-lg mb-1">{type.icon}</span>
                            <span className="text-sm">{type.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {formData.contactType === 'meeting' && (
                    <div>
                      <label className="block text-cyan-400 mb-2">Date et heure</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        <input
                          type="time"
                          className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-cyan-400 mb-2 flex items-center">
                      <FiMessageSquare className="mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={4}
                      className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cyan-400 mb-2 flex items-center">
                      <FiPaperclip className="mr-2" />
                      Pièce jointe
                    </label>
                    <div className="flex items-center">
                      <label className="flex-1 bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 truncate cursor-pointer hover:bg-gray-800/60 transition-colors">
                        {formData.attachment ? formData.attachment.name : 'Sélectionner un fichier'}
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {formData.attachment && (
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                          className="ml-2 p-3 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-gray-800/60 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all flex items-center disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="
          absolute inset-0 rounded-xl 
          bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
          opacity-0 hover:opacity-30
          transition-opacity pointer-events-none
          -z-10
        "/>
      </div>
    </div>
  );
};

export default ContactClientModal;