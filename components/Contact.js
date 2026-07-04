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
        e.target.reset();
      } else {
        const errorData = await response.json();
        if(!response.ok){

          setStatus({ submitting: false, success: false, error: true, message: `Failed to send message:You can only send one message per 24 hours` });
        }
       
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ submitting: false, success: false, error: true, message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-label">Let’s Connect</span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <p className={`${styles.summary} section-intro`}>
            Whether you want a polished product, a smarter AI experience, or a fast-moving team, I’d love to hear about it.
          </p>
        </div>

        <motion.div
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input className={styles.input} type="text" name="name" placeholder="Name" required onChange={handleChange} />
              <input className={styles.input} type="email" name="email" placeholder="Email" required onChange={handleChange} />
            </div>
            <input className={styles.input} type="text" name="subject" placeholder="Subject" required onChange={handleChange} />
            <textarea className={styles.textarea} name="message" rows="6" placeholder="Message" required onChange={handleChange}></textarea>
            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={status.submitting}
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px var(--glow)' }}
              whileTap={{ scale: 0.97 }}
            >
              {status.submitting ? 'Sending...' : <>Send Message <FaPaperPlane size={16} /></>}
            </motion.button>
            {status.message && (
              <p className={`${styles.statusMessage} ${status.error ? styles.error : styles.success}`}>
                {status.message}
              </p>
            )}
          </form>

          <div className={styles.infoPanel}>
            <h3 className={styles.infoTitle}>Let&apos;s build something memorable</h3>
            <div className={styles.contactItem}>
              <FaEnvelope size={16} className="neon-text" />
              <a className={styles.contactLink} href="mailto:manishtochand@email.com">manishtochand@gmail.com</a>
            </div>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/manish-chand-3b7b4a158/" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
              <a href="https://github.com/manishcad" aria-label="GitHub"><FaGithub size={18} /></a>
           
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
