import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { level: 'desc' },
    });

    return Response.json(skills);
  } catch (error) {
    console.error('Failed to load skills:', error);
    return Response.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, level } = body;

    if (!name || typeof level !== 'number' || level < 0 || level > 100) {
      return Response.json({ error: 'Name and a numeric level between 0 and 100 are required.' }, { status: 400 });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        level,
      },
    });

    return Response.json({ success: true, skill }, { status: 201 });
  } catch (error) {
    console.error('Failed to create skill:', error);
    return Response.json({ error: 'Unable to create skill right now.' }, { status: 500 });
  }
}
