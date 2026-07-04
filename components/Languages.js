'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Languages.module.css';

export default function Languages() {
  
  

  const languages = [
  {
    name: "Odia",
    proficiency: "Native",
    level: 100,
    funFact: "My default operating system."
  },
  {
    name: "Hindi",
    proficiency: "Fluent",
    level: 95,
    funFact: "Can negotiate prices and survive family functions."
  },
  {
    name: "English",
    proficiency: "Professional",
    level: 90,
    funFact: "You thought this was my favorite language? Nope... I spend most of my day talking to Python. You can call me Pythonic."
  }
];

  return (
    <section id="languages" className={styles.languages}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-label">Communication</span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Languages
          </motion.h2>
            <p className={`${styles.summary} section-intro`}>
                  Human languages are useful, but let's be honest—I spend more time arguing
                  with compilers than with people. If I suddenly start speaking in Python,
                  JavaScript, or SQL... that's perfectly normal.
            </p>
        </div>

        <motion.div
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
         
         
           {languages.map((lang, index) => (
            <div className={styles.languageItem} key={lang.name}>
                  <div className={styles.info}>
                    <span className={styles.name}>{lang.name}</span>
                    <span className={`${styles.fluency} neon-text`}>
                      {lang.proficiency}
                    </span>
                  </div>

                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progress}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        ease: "easeOut",
                      }}
                    />
              </div>

              <p className={styles.funFact}>{lang.funFact}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
