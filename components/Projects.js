'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import styles from './Projects.module.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <div className={`${styles.container} container`}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        {loading && <p>Loading projects...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className={`${styles.card} glass`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.imageContainer}>
                  <Image 
                    src={project.imageUrl || 'https://res.cloudinary.com/dgbe30e7f/image/upload/v1783001401/sonic_oxoevx.png'} 
                    alt={project.title} 
                    className={styles.image}
                    width={500}
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.links}>
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                          <FaExternalLinkAlt size={20} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.techStack}>
                    {project.technologies.map(tech => (
                      <span key={tech.id} className={styles.techTag}>{tech.name}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
