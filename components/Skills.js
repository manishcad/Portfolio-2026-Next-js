'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';
import styles from './Skills.module.css';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
          throw new Error('Failed to load skills');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className={styles.skills}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>

        <div className={styles.grid}>
          <motion.div 
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`${styles.illustration} glass neon-border`}>
              <FaTerminal size={120} className="neon-text" />
              <div className={styles.codeSnippet}>
                <pre>
                  <code>
                    {`class Developer {
  constructor() {
    this.name = "Manish";
    this.focus = "AI & Web";
  }
  
  solve(problem) {
    return this.ai.optimize(
      this.web.render(problem)
    );
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          <div className={styles.right}>
            {loading && <p>Loading skills...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && skills.map((skill, index) => (
              <div key={skill.id} className={styles.skillBarWrapper}>
                <div className={styles.skillInfo}>
                  <span>{skill.name}</span>
                  <span className="neon-text">{skill.level}%</span>
                </div>
                <div className={styles.barContainer}>
                  <motion.div 
                    className={styles.bar}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
