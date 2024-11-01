import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if completion already exists for today
    const existingCompletion = await prisma.completion.findFirst({
      where: {
        habitId: params.habitId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (existingCompletion) {
      // If completion exists, delete it (toggle off)
      await prisma.completion.delete({
        where: { id: existingCompletion.id },
      });
      return NextResponse.json({ completed: false });
    } else {
      // If no completion exists, create one (toggle on)
      const completion = await prisma.completion.create({
        data: {
          habitId: params.habitId,
          date: today,
        },
      });
      return NextResponse.json({ completed: true });
    }
  } catch (error) {
    console.error('Failed to toggle habit completion:', error);
    return NextResponse.json(
      { error: 'Failed to toggle habit completion' },
      { status: 500 }
    );
  }
}