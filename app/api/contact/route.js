import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Get the client's IP address
    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Calculate 24 hours ago
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Check if this IP has already sent a message in the last 24 hours
    const existing = await prisma.contactMessage.findFirst({
      where: {
        ipAddress: ip,
        createdAt: {
          gte: yesterday,
        },
      },
    });

    if (existing) {
      return Response.json(
        {
          error: "You can only send one message every 24 hours.",
        },
        {
          status: 429,
        }
      );
    }

    // Save the message
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        ipAddress: ip,
      },
    });

    return Response.json(
      {
        success: true,
        message: savedMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Failed to save contact message:", error);

    return Response.json(
      {
        error: "Unable to save your message right now.",
      },
      {
        status: 500,
      }
    );
  }
}