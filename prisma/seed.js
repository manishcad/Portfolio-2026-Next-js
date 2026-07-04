const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.skill.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactMessage.deleteMany();

  await prisma.skill.createMany({
    data: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Next.js', level: 95 },
      { name: 'React', level: 90 },
      { name: 'Django', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Prisma', level: 85 },
      { name: 'LangChain', level: 80 },
      { name: 'AI/LLM Development', level: 85 },
    ],
  });

  const projectOne = await prisma.project.create({
    data: {
      title: 'AI Portfolio Studio',
      description: 'A polished portfolio experience built with Next.js and AI-assisted content flow.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      technologies: {
        create: [{ name: 'Next.js' }, { name: 'Prisma' }, { name: 'Tailwind CSS' }],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Smart Support Dashboard',
      description: 'A multi-tenant analytics dashboard for customer support automation.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      technologies: {
        create: [{ name: 'React' }, { name: 'Node.js' }, { name: 'PostgreSQL' }],
      },
    },
  });

  console.log('Seeded portfolio data:', projectOne.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
