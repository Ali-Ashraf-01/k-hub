import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const pageText = {
  ar: {
    eyebrow: 'تواصل معنا',
    title: 'اسأل عن الحجز أو ابعت لنا طلبك',
    desc: 'ابعت لنا استفسارك عن الحجز أو الملاعب أو العروض، وفريق K-HUB هيتواصل معاك.',
    name: 'الاسم',
    phone: 'الموبايل',
    message: 'الرسالة',
    subject: 'نوع الطلب',
    submit: 'إرسال الرسالة',
    success: 'تم إرسال رسالتك بنجاح.',
    infoTitle: 'بيانات النادي',
    address: 'العنوان',
    addressValue: 'K-HUB Sports Club - المنوفيه',
    hours: 'مواعيد العمل',
    phoneLabel: 'الهاتف',
    email: 'الإيميل',
    map: 'مكان الخريطة',
  },
  en: {
    eyebrow: 'Contact us',
    title: 'Ask about booking or send your request',
    desc: 'Send us your booking, courts, or offers inquiry and the K-HUB team will contact you.',
    name: 'Name',
    phone: 'Phone',
    message: 'Message',
    subject: 'Request type',
    submit: 'Send message',
    success: 'Your message was sent successfully.',
    infoTitle: 'Club info',
    address: 'Address',
    addressValue: 'K-HUB Sports Club - shepin el kome',
    hours: 'Open hours',
    phoneLabel: 'Phone',
    email: 'Email',
    map: 'Map placeholder',
  },
  fr: {
    eyebrow: 'Contact',
    title: 'Posez une question ou envoyez votre demande',
    desc: 'Envoyez votre demande sur les réservations, les terrains ou les offres, et l’équipe K-HUB vous contactera.',
    name: 'Nom',
    phone: 'Téléphone',
    message: 'Message',
    subject: 'Type de demande',
    submit: 'Envoyer',
    success: 'Votre message a été envoyé avec succès.',
    infoTitle: 'Infos du club',
    address: 'Adresse',
    addressValue: 'K-HUB Sports Club - Le Caire',
    hours: 'Heures d’ouverture',
    phoneLabel: 'Téléphone',
    email: 'E-mail',
    map: 'Emplacement carte',
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const text = pageText[language] || pageText.ar;
  const [form, setForm] = useState({ name: '', phone: '', subject: 'booking', message: '' });
  const [success, setSuccess] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const saved = JSON.parse(localStorage.getItem('khub-contact-messages') || '[]');
    localStorage.setItem(
      'khub-contact-messages',
      JSON.stringify([...saved, { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
    );
    setSuccess(text.success);
    setForm({ name: '', phone: '', subject: 'booking', message: '' });
  }

  return (
    <div className="page section">
      <section className="info-hero">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.desc}</p>
        </div>
      </section>

      <section className="contact-layout">
        <form className="contact-form premium-card" onSubmit={handleSubmit}>
          <label>
            {text.name}
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>

          <label>
            {text.phone}
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
          </label>

          <label>
            {text.subject}
            <select value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })}>
              <option value="booking">Booking</option>
              <option value="payment">Payment</option>
              <option value="private-event">Private Event</option>
            </select>
          </label>

          <label>
            {text.message}
            <textarea rows="6" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          </label>

          {success && <p className="success-text">✓ {success}</p>}

          <button className="btn btn-primary full-width" type="submit">{text.submit}</button>
        </form>

        <aside className="contact-info premium-card">
          <h2>{text.infoTitle}</h2>
          <div className="info-list">
            <p><span>{text.address}</span><strong>{text.addressValue}</strong></p>
            <p><span>{text.hours}</span><strong>08:00 - 23:00</strong></p>
            <p><span>{text.phoneLabel}</span><strong>01000000000</strong></p>
            <p><span>{text.email}</span><strong>info@khub.com</strong></p>
          </div>
          <div className="map-placeholder">
            <span>📍</span>
            <strong>{text.map}</strong>
          </div>
        </aside>
      </section>
    </div>
  );
}
