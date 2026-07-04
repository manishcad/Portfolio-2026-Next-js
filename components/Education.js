'use client';

import { motion } from 'framer-motion';
import {
  FaGamepad,
  FaPlane,
  FaBook,
  FaLaptopCode,
  FaRobot,
  FaCode
} from 'react-icons/fa';
import styles from './Education.module.css';

const hobbies = [
  {
    icon: <FaLaptopCode className="neon-text" size={24} />,
    title: 'Building Projects',
    description:
      'I enjoy building full-stack web applications, experimenting with modern frameworks, and creating products from scratch.'
  },
  {
    icon: <FaRobot className="neon-text" size={24} />,
    title: 'AI & GenAI',
    description:
      'Exploring LLMs, LangChain, local AI models, and automation is one of my favorite things to do.'
  },
  {
    icon: <FaGamepad className="neon-text" size={24} />,
    title: 'Gaming',
    description:
      'I love playing PC games during my free time. Gaming helps me relax and improve my problem-solving skills.'
  }
];

const interests = [
  '✈️ Traveling & Exploring New Places',
  '📚 Reading Technology Articles',
  '💡 Learning New Programming Languages',
  '🧩 Solving Coding Challenges',
  '🎵 Listening to Music While Coding',
  '🚀 Exploring New Technologies',
  "🍻Love going to the pub with my friends for a few drinks"
];

export default function Hobbies() {
  return (
    <section id="hobbies" className={styles.education}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-label">Beyond Coding</span>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Hobbies
          </motion.h2>

          <p className={`${styles.summary} section-intro`}>
            When I'm not writing code, I enjoy exploring technology,
            traveling, gaming, and continuously learning new things that
            inspire creativity and innovation.
          </p>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={`${styles.card} glass`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{
              y: -5,
              boxShadow: '0 0 25px rgba(0,229,255,.3)'
            }}
          >
            <div className={styles.cardHeader}>
              <FaCode className="neon-text" size={28} />
              <h3>What I Love Doing</h3>
            </div>

            <div className={styles.cardContent}>
              {hobbies.map((hobby, index) => (
                <div key={index} className={styles.educationItem}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    {hobby.icon}
                    <h4 className={styles.degree}>{hobby.title}</h4>
                  </div>

                  <p className={styles.description}>
                    {hobby.description}
                  </p>
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
            whileHover={{
              y: -5,
              boxShadow: '0 0 25px rgba(0,229,255,.3)'
            }}
          >
            <div className={styles.cardHeader}>
              <FaBook className="neon-text" size={28} />
              <h3>Other Interests</h3>
            </div>

            <div className={styles.cardContent}>
              <ul className={styles.certList}>
                {interests.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}