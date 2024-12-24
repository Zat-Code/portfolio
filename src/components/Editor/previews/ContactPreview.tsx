import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { VscMail, VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import emailjs from '@emailjs/browser';

const ContactPreview = () => {
  const { t } = useLanguage();

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Benjamin THEYTAZ',
        reply_to: formData.email
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e1e] text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="rounded-lg p-6 border-2 border-[#007acc] hover:shadow-[0_0_15px_rgba(0,122,204,0.1)] transition-all animate-fade-in">
          {/* Contact Info */}
          <div className="mb-6 flex flex-wrap gap-6">
            <a 
              href="mailto:benjamin.theytaz@hotmail.fr"
              className="flex items-center gap-2 text-white/80 hover:text-[#007acc] transition-all hover:scale-110 hover:translate-x-1 group"
            >
              <VscMail className="text-lg group-hover:rotate-12 transition-transform" />
              <span>benjamin.theytaz@hotmail.fr</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/benjamin-theytaz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-[#007acc] transition-all hover:scale-110 hover:translate-x-1 group"
            >
              <SiLinkedin className="text-lg group-hover:rotate-12 transition-transform" />
              <span>/benjamin-theytaz</span>
            </a>
            <a 
              href="https://github.com/Zat-Code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-[#007acc] transition-all hover:scale-110 hover:translate-x-1 group"
            >
              <VscGithubInverted className="text-lg group-hover:rotate-12 transition-transform" />
              <span>@Zat-Code</span>
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-white/60 mb-1.5 group-hover:text-white/80 transition-colors">{t('contact.name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white/80 focus:border-[#007acc] focus:outline-none transition-all group-hover:border-[#3c3c3c]/80"
                  required
                />
              </div>
              <div className="group">
                <label className="block text-white/60 mb-1.5 group-hover:text-white/80 transition-colors">{t('contact.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white/80 focus:border-[#007acc] focus:outline-none transition-all group-hover:border-[#3c3c3c]/80"
                  required
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-white/60 mb-1.5 group-hover:text-white/80 transition-colors">{t('contact.subject')}</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white/80 focus:border-[#007acc] focus:outline-none transition-all group-hover:border-[#3c3c3c]/80"
                required
              />
            </div>
            <div className="group">
              <label className="block text-white/60 mb-1.5 group-hover:text-white/80 transition-colors">{t('contact.message')}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full h-28 bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white/80 focus:border-[#007acc] focus:outline-none resize-none transition-all group-hover:border-[#3c3c3c]/80"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-5 py-2 bg-[#007acc] hover:bg-[#006bb3] text-white rounded transition-all relative overflow-hidden group hover:scale-105 hover:shadow-[0_0_10px_rgba(0,122,204,0.3)]"
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <span className="relative z-10">
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </span>
              </button>

              {status === 'success' && (
                <p className="text-green-500 animate-fade-in">{t('contact.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 animate-fade-in">{t('contact.error')}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPreview; 