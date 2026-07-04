import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      include: {
        technologies: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(projects);
  } catch (error) {
    console.error('Failed to load projects:', error);
    return Response.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, featured, technologies } = body;

    if (!title || !description) {
      return Response.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl ?? null,
        projectUrl: projectUrl ?? null,
        githubUrl: githubUrl ?? null,
        featured: featured ?? true,
        technologies: technologies && Array.isArray(technologies)
          ? {
              create: technologies.map((tech) => ({
                name: typeof tech === 'string' ? tech : tech?.name,
              })),
            }
          : undefined,
      },
    });

    return Response.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return Response.json({ error: 'Unable to create project right now.' }, { status: 500 });
  }
}
