'use client';

import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';
import styles from './Skills.module.css';

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'Next.js', level: 95 },
  { name: 'React', level: 90 },
  { name: 'Django', level: 80 },
  { name: 'PostgreSQL', level: 75 },
  { name: 'Prisma', level: 85 },
  { name: 'LangChain', level: 80 },
  { name: 'AI/LLM Development', level: 85 },
];

export default function Skills() {
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
            {skills.map((skill, index) => (
              <div key={skill.name} className={styles.skillBarWrapper}>
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
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
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
