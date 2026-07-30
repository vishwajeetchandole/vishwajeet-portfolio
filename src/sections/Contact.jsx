import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { usePortfolio, showGlobalToast } from '../context/PortfolioContext';

export default function Contact() {
  const { data } = usePortfolio();
  const { contact, emailjs: emailjsConfig } = data;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const contactDetails = [
    { icon: Mail, label: "Email Me", value: contact?.email || "chandolevishwajeet@gmail.com", href: `mailto:${contact?.email}` },
    { icon: MapPin, label: "Location", value: contact?.location || "Kolhapur, Maharashtra, India", href: `https://maps.google.com/?q=${encodeURIComponent(contact?.location || "Kolhapur")}` },
    { icon: Github, label: "GitHub", value: contact?.github?.replace('https://', '') || "github.com/vishwajeetchandole", href: contact?.github || "https://github.com/vishwajeetchandole" },
    { icon: Linkedin, label: "LinkedIn", value: contact?.linkedin?.replace('https://', '') || "linkedin.com/in/vishwajeetchandole", href: contact?.linkedin || "https://linkedin.com/in/vishwajeetchandole" }
  ];

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showGlobalToast('Please fill out all fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const serviceId = emailjsConfig?.serviceId;
    const templateId = emailjsConfig?.templateId;
    const publicKey = emailjsConfig?.publicKey;

    // If EmailJS credentials are fully configured and not default placeholders
    if (serviceId && templateId && publicKey && !serviceId.includes('YOUR')) {
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          to_email: contact?.email || 'chandolevishwajeet@gmail.com'
        };

        // Send main notification email to you
        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        // If a separate Auto-Reply Template ID is configured in Admin, send auto-reply to user
        const autoReplyTemplateId = emailjsConfig?.autoReplyTemplateId;
        if (autoReplyTemplateId && autoReplyTemplateId.trim() !== '') {
          try {
            const autoReplyParams = {
              ...templateParams,
              to_name: formData.name,
              to_email: formData.email, // Send to the person who filled the form
              reply_to: contact?.email || 'chandolevishwajeet@gmail.com' // Replies to the auto-reply go back to admin
            };
            await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey);
          } catch (err) {
            console.warn('Auto-reply trigger warning:', err);
          }
        }

        setIsSubmitting(false);
        setSubmitSuccess(true);
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#f96300', '#ff8533', '#ffffff', '#fbbf24'] });
        showGlobalToast('Email sent successfully!', 'success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (err) {
        console.error('EmailJS Error:', err);
        setIsSubmitting(false);
        setErrorMessage('Failed to send email via EmailJS. Opening default mail client...');
        showGlobalToast('Direct email send failed. Opening mail client.', 'warning');

        // Fallback to mailto link
        window.location.href = `mailto:${contact?.email || 'chandolevishwajeet@gmail.com'}?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)} (From: ${encodeURIComponent(formData.email)})`;
      }
    } else {
      // Direct mailto fallback if EmailJS is not configured in Admin yet
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        showGlobalToast('Message prepared! Opening mail client.', 'info');

        window.location.href = `mailto:${contact?.email || 'vishwajeetchandole@gmail.com'}?subject=Portfolio Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AReply-To: ${encodeURIComponent(formData.email)}`;

        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 4000);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="relative py-24 section-top-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans"
          >Get In Touch</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >Let's Connect</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed"
          >I'm always open to discussing technology, collaborating on projects, internships, and connecting with like-minded individuals.</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Contact Details */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {contactDetails.map((detail, idx) => {
              const IconComp = detail.icon;
              return (
                <a key={idx} href={detail.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(249,99,0,0.1)] transition-all duration-300 group block"
                >
                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-brand-orange group-hover:bg-orange-100 transition-all duration-300 flex-shrink-0">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-bold tracking-wider uppercase block">{detail.label}</span>
                    <span className="text-gray-700 font-semibold text-sm break-all">{detail.value}</span>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-colors duration-200 placeholder-gray-300"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-colors duration-200 placeholder-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Message</label>
                  <textarea name="message" rows="5" value={formData.message} onChange={handleInputChange} required placeholder="Hello, I'd like to talk about..."
                    className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-colors duration-200 resize-none placeholder-gray-300"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange-light disabled:from-gray-300 disabled:to-gray-300 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-xl shadow-[0_4px_14px_rgba(249,99,0,0.3)] hover:shadow-[0_6px_22px_rgba(249,99,0,0.45)] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /><span>Sending...</span></>
                  ) : (
                    <><span>Send Message</span><Send className="h-4 w-4" /></>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                    className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center z-30"
                  >
                    <CheckCircle2 className="h-16 w-16 text-brand-orange mb-4 stroke-[1.5] animate-bounce" />
                    <h4 className="font-sans font-bold text-gray-900 text-xl mb-2">Message Sent!</h4>
                    <p className="text-gray-500 text-sm max-w-sm">Thank you for reaching out. Your message has been sent to Vishwajeet.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
