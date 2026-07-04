'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div 
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.content}>
            <p>
              I am a passionate Full Stack Developer and AI Engineer with over 3 years of experience in building high-performance web applications and intelligent systems. My journey in tech started with a curiosity for how things work under the hood, which evolved into a career dedicated to creating elegant solutions for complex problems.
            </p>
            <p>
              I specialize in the Next.js ecosystem, Python-based AI development, and scalable cloud architectures. I love bridging the gap between cutting-edge AI capabilities and intuitive user interfaces.
            </p>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <h3 className="neon-text">12</h3>
                <p>Coding Since</p>
              </div>
              <div className={styles.statItem}>
                <h3 className="neon-text">20+</h3>
                <p>Projects Completed</p>
              </div>
              <div className={styles.statItem}>
                <h3 className="neon-text">15+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>

            <div className={styles.goals}>
              <h4 className="neon-text">My Mission</h4>
              <p>
                To push the boundaries of digital innovation by integrating Artificial Intelligence into everyday web experiences, making them more personal, efficient, and impactful.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
