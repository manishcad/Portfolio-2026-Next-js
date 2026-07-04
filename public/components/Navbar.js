'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUserAlt, FaLaptopCode, FaBriefcase, FaEnvelope, FaMicrochip } from 'react-icons/fa';
import styles from './Navbar.module.css';

const navItems = [
  { id: 'home', icon: FaHome, label: 'Home' },
  { id: 'about', icon: FaUserAlt, label: 'About' },
  { id: 'skills', icon: FaMicrochip, label: 'Skills' },
  { id: 'projects', icon: FaLaptopCode, label: 'Projects' },
  { id: 'experience', icon: FaBriefcase, label: 'Experience' },
  { id: 'contact', icon: FaEnvelope, label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navContainer} glass`}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            <item.icon size={20} />
            <span className={styles.tooltip}>{item.label}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className={styles.activeIndicator}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
