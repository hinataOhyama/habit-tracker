import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const json = await req.json();
    const habit = await prisma.habit.update({
      where: { id: params.habitId },
      data: {
        title: json.title,
        description: json.description,
        frequency: json.frequency,
        startDate: json.startDate,
        categoryId: json.category,
      },
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Failed to update habit:', error);
    return NextResponse.json(
      { error: 'Failed to update habit' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    // First delete all completions
    await prisma.completion.deleteMany({
      where: { habitId: params.habitId },
    });

    // Then delete the habit
    const habit = await prisma.habit.delete({
      where: { id: params.habitId },
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Failed to delete habit:', error);
    return NextResponse.json(
      { error: 'Failed to delete habit' },
      { status: 500 }
    );
  }
}