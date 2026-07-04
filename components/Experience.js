'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const journey = [
  {
    title: '10th Board',
    place: 'Holy Angels Convent School',
    duration: 'Completed',
    description:
      'Successfully completed my secondary education while building a strong foundation in mathematics, science, and problem-solving. This is where my curiosity for computers first began.'
  },
  {
    title: '12th Board',
    place: 'Higher Secondary Education',
    duration: 'Completed',
    description:
      'Completed my higher secondary education and decided to pursue a career in software development. During this period, I developed a strong interest in programming and technology.'
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    place: 'Computer Applications',
    duration: 'Graduated',
    description:
      'Earned my Bachelor of Computer Applications degree, studying programming, databases, operating systems, networking, software engineering, and web development. I also began building real-world projects using modern technologies.'
  },
  {
    title: 'Self-Learning Journey',
    place: 'Full Stack & AI Development',
    duration: 'Present',
    description:
      'Outside the classroom, I continue learning by building practical projects with Next.js, Django, Python, PostgreSQL, Prisma, LangChain, and AI technologies. I believe the best way to learn is by building.'
  }
];

export default function Journey() {
  return (
    <section id="journey" className={styles.experience}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-label">Learning Never Stops</span>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Academic Journey
          </motion.h2>

          <p className={`${styles.summary} section-intro`}>
            Every milestone has shaped me into the developer I am today. From
            school to university and countless hours of self-learning, each
            step has strengthened my passion for creating impactful software.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line}></div>

          {journey.map((item, index) => (
            <motion.div
              key={index}
              className={styles.timelineItem}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={{
                offscreen: {
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100
                },
                onscreen: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: 0.8
                  }
                }
              }}
            >
              <div className={styles.node}></div>

              <div className={`${styles.content} glass`}>
                <h3 className={styles.role}>{item.title}</h3>

                <p className={styles.company}>{item.place}</p>

                <span className={styles.duration}>
                  {item.duration}
                </span>

                <p className={styles.description}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}