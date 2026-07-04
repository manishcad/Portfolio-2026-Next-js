'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitter, FaPaperPlane, FaGithub } from 'react-icons/fa';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: false, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Optionally reset form fields
        e.target.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).map(err => err.join(' ')).join(' ');
        setStatus({ submitting: false, success: false, error: true, message: `Failed to send message: ${errorMessage}` });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ submitting: false, success: false, error: true, message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <motion.div 
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            </div>
            <input type="text" name="subject" placeholder="Subject" required onChange={handleChange} />
            <textarea name="message" rows="6" placeholder="Message" required onChange={handleChange}></textarea>
            <motion.button 
              type="submit" 
              className={styles.submitBtn}
              disabled={status.submitting}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--glow)' }}
              whileTap={{ scale: 0.95 }}
            >
              {status.submitting ? 'Sending...' : <>Send Message <FaPaperPlane size={18} /></>}
            </motion.button>
            {status.message && (
              <p className={`${styles.statusMessage} ${status.error ? styles.error : styles.success}`}>
                {status.message}
              </p>
            )}
          </form>

          <div className={styles.divider}></div>

          <div className={styles.info}>
            <p>
              <FaEnvelope size={16} /> manish.codes@email.com
            </p>
            <div className={styles.socials}>
              <a href="#"><FaLinkedin size={22} /></a>
              <a href="#"><FaGithub size={22} /></a>
              <a href="#"><FaTwitter size={22} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
