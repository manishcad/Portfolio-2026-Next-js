import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, featured, technologies } = body;

    if (!title || !description) {
      return Response.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        imageUrl: imageUrl ?? null,
        projectUrl: projectUrl ?? null,
        githubUrl: githubUrl ?? null,
        featured: featured ?? true,
        technologies: technologies && Array.isArray(technologies)
          ? {
              deleteMany: {},
              create: technologies.map((tech) => ({ name: typeof tech === 'string' ? tech : tech?.name })),
            }
          : undefined,
      },
    });

    return Response.json({ success: true, project });
  } catch (error) {
    console.error('Failed to update project:', error);
    return Response.json({ error: 'Unable to update project right now.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id: Number(id) } });
    return Response.json({ error: 'Unable to delete project right now.' }, { status: 500 });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return Response.json({ error: 'Unable to delete project right now.' }, { status: 500 });
  }
}
