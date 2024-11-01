import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const categoryMapping = {
  health: 'health',
  learning: 'learning',
  productivity: 'productivity',
  mindfulness: 'mindfulness',
};

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categoryId = categoryMapping[params.category as keyof typeof categoryMapping];
    
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const habits = await prisma.habit.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        completions: {
          where: {
            date: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
            },
          },
        },
      },
    });

    // Calculate completion rate and streak for each habit
    const habitsWithStats = habits.map((habit) => {
      const totalDays = 30;
      const completedDays = habit.completions.length;
      const completionRate = Math.round((completedDays / totalDays) * 100);

      // Calculate streak (simplified version)
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const completed = habit.completions.some(
          (completion) => 
            new Date(completion.date).toDateString() === date.toDateString()
        );

        if (completed) {
          streak++;
        } else {
          break;
        }
      }

      return {
        ...habit,
        completions: undefined,
        completionRate,
        streak,
      };
    });

    return NextResponse.json(habitsWithStats);
  } catch (error) {
    console.error('Failed to fetch habits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}