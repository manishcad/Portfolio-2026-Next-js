'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward } from 'react-icons/fa';
import styles from './Education.module.css';

const certifications = [
  'Python for Data Science',
  'Advanced Django Development',
  'Next.js Certified Professional',
  'AI/ML Specialist',
  'AWS Certified Solutions Architect'
];

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        if (!response.ok) {
          throw new Error('Failed to fetch education data.');
        }
        const data = await response.json();
        setEducation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).getFullYear();
  };

  return (
    <section id="education" className={styles.education}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Education & Certifications
        </motion.h2>

        <div className={styles.grid}>
          <motion.div 
            className={`${styles.card} glass`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5, boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)' }}
          >
            <div className={styles.cardHeader}>
              <FaGraduationCap className="neon-text" size={30} />
              <h3>Education</h3>
            </div>
            <div className={styles.cardContent}>
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading && !error && education.map(edu => (
                <div key={edu.id} className={styles.educationItem}>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution}</p>
                  <span className="neon-text">
                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                  </span>
                  {edu.description && <p className={styles.description}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.card} glass`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5, boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)' }}
          >
            <div className={styles.cardHeader}>
              <FaAward className="neon-text" size={30} />
              <h3>Certifications</h3>
            </div>
            <div className={styles.cardContent}>
              <ul>
                {certifications.map(cert => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
