'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import Link from 'next/link';
const roles = [
  'Full Stack Developer',
  'GenAI Developer',
  'Python Django Developer',
  'Next.js Developer'
];

const profileImages = [
  "https://res.cloudinary.com/dgbe30e7f/image/upload/v1780285880/my-img2_rtuqdv.jpg",
  "https://res.cloudinary.com/dgbe30e7f/image/upload/v1780285860/my-img5_nu3sbk.jpg",
  "https://res.cloudinary.com/dgbe30e7f/image/upload/v1780285860/my-img4_vpe1a9.jpg",
  "https://res.cloudinary.com/dgbe30e7f/image/upload/v1780285802/my-img_exvban.jpg",
  "https://res.cloudinary.com/dgbe30e7f/image/upload/v1780285797/my-img3_ijj2cr.jpg",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
        
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };
    
    const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section id="home" className={styles.hero}>
      <div className={`${styles.container} container`}>
        <motion.div 
          className={styles.profileSection}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`${styles.imageWrapper} neon-border`}
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              key={profileImages[currentImageIndex]} // Add key to force re-render
              src={profileImages[currentImageIndex]}
              alt="Profile" 
              className={styles.profileImage}
              width={200}
              height={200}
              priority // Prioritize loading the hero image
            />
          </motion.div>
        </motion.div>

        <div className={styles.content}>
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello ,I'm <span className="neon-text">Manish</span>
          </motion.h1>
          
          <motion.div 
            className={styles.typingWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.typingText}>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </motion.div>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            I build scalable web applications, AI-powered solutions,
            and modern digital experiences that combine performance
            with exceptional user experience.
          </motion.p>

          <motion.div 
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link className={`${styles.primaryBtn} glass neon-border`} href="#projects">
              View My Work
            </Link>
            <Link 
              href="/Manish_Resume.pdf" 
              download
              className={`${styles.secondaryBtn} glass`}
            >
              Download Resume
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
