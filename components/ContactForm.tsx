import { FormEvent, useState } from 'react';
import styles from '../styles/ContactForm.module.css';

interface ContactFormProps {
  email: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ email }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Portfolio contact from ${form.name}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      '',
      form.message,
    ].filter(Boolean);

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-phone">Phone (optional)</label>
        <input id="contact-phone" type="tel" value={form.phone} onChange={update('phone')} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={update('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.submit}>
        Send message
      </button>

      {sent && <p className={styles.sentNote}>Opening your email client&hellip;</p>}
    </form>
  );
}
