import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Mail, MessageCircle, Facebook, Send, MapPin, Sprout } from 'lucide-react';
import { settings } from '../../lib/content';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name:    formData.name,
        email:   formData.email,
        title:   `Message from ${formData.name}`,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <Label htmlFor="contact-name" style={{ color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}>Your Name</Label>
        <Input
          id="contact-name" name="name" type="text" placeholder="Danielle"
          value={formData.name} onChange={handleChange} required
          style={{ marginTop: '0.5rem', borderColor: '#d1fae5', borderRadius: '0.625rem' }}
        />
      </div>
      <div>
        <Label htmlFor="contact-email" style={{ color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}>Email Address</Label>
        <Input
          id="contact-email" name="email" type="email" placeholder="you@email.com"
          value={formData.email} onChange={handleChange} required
          style={{ marginTop: '0.5rem', borderColor: '#d1fae5', borderRadius: '0.625rem' }}
        />
      </div>
      <div>
        <Label htmlFor="contact-message" style={{ color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}>Your Message</Label>
        <Textarea
          id="contact-message" name="message" placeholder="Tell us about your garden journey..."
          value={formData.message} onChange={handleChange} required rows={6}
          style={{ marginTop: '0.5rem', borderColor: '#d1fae5', borderRadius: '0.625rem' }}
        />
      </div>

      {submitStatus === 'success' && (
        <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', color: '#15803d', fontSize: '0.875rem' }}>
          🌱 Thank you! We'll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div style={{ padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', color: '#dc2626', fontSize: '0.875rem' }}>
          Sorry, something went wrong. Email us directly at <strong>daniellediemahave@gmail.com</strong>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: '#166534', color: 'white', fontWeight: 700,
          padding: '0.875rem 2rem', borderRadius: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          fontSize: '1rem', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1, transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#14532d'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#166534'; }}
      >
        <Send size={18} />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

function buildContactLinks() {
  const c = settings.contact;
  return [
    {
      icon: Mail,
      label: 'Email',
      value: c.email,
      href: `mailto:${c.email}`,
      accent: '#166534',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: c.whatsappDisplay,
      href: `https://wa.me/${c.whatsapp}`,
      accent: '#15803d',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: c.facebookDisplay,
      href: c.facebook,
      accent: '#166534',
    },
    {
      icon: MapPin,
      label: 'Based in',
      value: 'Mauritius 🌴',
      href: undefined as string | undefined,
      accent: '#166534',
    },
  ];
}

export function ContactSection() {
  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '4rem', height: '4rem', borderRadius: '1rem', backgroundColor: '#166534',
          marginBottom: '1.25rem', boxShadow: '0 8px 24px rgba(22,101,52,0.25)',
        }}>
          <Sprout size={24} color="white" />
        </div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '0.75rem' }}>
          Get in Touch
        </p>
        <h2 style={{ fontFamily: 'ui-serif, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#111827', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Let's Grow Together
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
          Have questions, want to share your garden journey, or just feel like saying hi?
          We'd love to hear from you.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* Left — Contact Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          border: '2px solid #d1fae5',
          boxShadow: '0 8px 32px rgba(22,101,52,0.08)',
          overflow: 'hidden',
        }}>
          {/* Card accent header */}
          <div style={{
            background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
            padding: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={16} color="white" />
            </div>
            <div>
              <p style={{ fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700, fontSize: '1.15rem', color: 'white', margin: 0 }}>
                Send a Message
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: '0.1rem 0 0' }}>
                We reply within 24 hours
              </p>
            </div>
          </div>
          <div style={{ padding: '1.75rem' }}>
            <ContactForm />
          </div>
        </div>

        {/* Right — Contact Info + Quote */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Info cards */}
          {buildContactLinks().map(({ icon: Icon, label, value, href, accent }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                border: '1px solid #d1fae5',
                borderRadius: '1rem',
                padding: '1.125rem 1.375rem',
                boxShadow: '0 2px 10px rgba(22,101,52,0.06)',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(22,101,52,0.14)';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#86efac';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 10px rgba(22,101,52,0.06)';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
              }}
            >
              <div style={{
                width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem',
                backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={20} color={accent} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', textDecoration: 'none', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#111827')}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', margin: 0 }}>{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Warm quote */}
          <div style={{
            background: 'linear-gradient(135deg, #052e16 0%, #166534 100%)',
            borderRadius: '1.25rem',
            padding: '1.75rem',
            marginTop: '0.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative leaf shape */}
            <svg
              viewBox="0 0 120 120" width="90" height="90"
              style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.12 }}
              aria-hidden="true"
            >
              <path d="M60 10 C90 10, 110 40, 60 110 C10 40, 30 10, 60 10Z" fill="white" />
            </svg>

            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, fontStyle: 'italic', margin: '0 0 1rem', position: 'relative' }}>
              "Every message I receive from a fellow plant lover brightens my day. Don't be shy — reach out anytime!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{ width: '2rem', height: '2px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
              <p style={{ fontSize: '0.825rem', fontWeight: 700, color: '#86efac', margin: 0 }}>
                Danielle Feliciane-Diemahave
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
