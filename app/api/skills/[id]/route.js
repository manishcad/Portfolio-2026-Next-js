import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, level } = body;

    if (!name || typeof level !== 'number' || level < 0 || level > 100) {
      return Response.json({ error: 'Name and a numeric level between 0 and 100 are required.' }, { status: 400 });
    }

    const skill = await prisma.skill.update({
      where: { id: Number(id) },
      data: { name, level },
    });

    return Response.json({ success: true, skill });
  } catch (error) {
    console.error('Failed to update skill:', error);
    return Response.json({ error: 'Unable to update skill right now.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id: Number(id) } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete skill:', error);
    return Response.json({ error: 'Unable to delete skill right now.' }, { status: 500 });
  }
}
