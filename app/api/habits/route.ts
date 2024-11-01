import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const habits = await prisma.habit.findMany({
      include: {
        category: true,
        completions: {
          where: {
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
      },
    });

    const habitsWithCompletion = habits.map((habit) => ({
      ...habit,
      completed: habit.completions.length > 0,
      completions: undefined,
    }));

    return NextResponse.json(habitsWithCompletion);
  } catch (error) {
    console.error('Failed to fetch habits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const habit = await prisma.habit.create({
      data: {
        title: json.title,
        description: json.description,
        frequency: json.frequency,
        startDate: json.startDate,
        categoryId: json.category,
        userId: 'demo-user', // TODO: Replace with actual user ID from auth
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Failed to create habit:', error);
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    );
  }
}