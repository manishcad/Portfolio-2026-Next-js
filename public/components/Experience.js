'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experiences = [
  {
    role: 'AI Engineer',
    company: 'Innovate AI',
    duration: '2025 - Present',
    description: 'Developing and deploying machine learning models for natural language processing and computer vision tasks. Optimized model performance by 40%.'
  },
  {
    role: 'Full Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: '2023 - 2025',
    description: 'Designed and implemented scalable web applications using React, Node.js, and AWS. Led the migration of a monolithic backend to a microservices architecture.'
  },
  {
    role: 'Software Developer Intern',
    company: 'CodeCrafters',
    duration: '2022 - 2023',
    description: 'Assisted in the development of a new e-commerce platform, focusing on front-end features and API integrations. Gained experience with agile methodologies.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Career Journey
        </motion.h2>

        <div className={styles.timeline}>
          <div className={styles.line}></div>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={styles.timelineItem}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={{
                offscreen: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                onscreen: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.8 } }
              }}
            >
              <div className={styles.node}></div>
              <div className={`${styles.content} glass`}>
                <h3>{exp.role}</h3>
                <p className={styles.company}>{exp.company}</p>
                <span className={styles.duration}>{exp.duration}</span>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
