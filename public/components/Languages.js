'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Languages.module.css';

export default function Languages() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages');
        if (!response.ok) {
          throw new Error('Failed to fetch languages.');
        }
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <section id="languages" className={styles.languages}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Languages
        </motion.h2>

        <motion.div 
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {loading && <p>Loading languages...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && languages.map((lang, index) => (
            <div key={lang.id} className={styles.languageItem}>
              <div className={styles.info}>
                <span className={styles.name}>{lang.name}</span>
                <span className={`${styles.fluency} neon-text`}>{lang.proficiency}</span>
              </div>
              <div className={styles.progressBar}>
                <motion.div 
                  className={styles.progress}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
