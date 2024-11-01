'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditHabitDialog } from './edit-habit-dialog';
import { DeleteHabitDialog } from './delete-habit-dialog';
import { HabitToggle } from './habit-toggle';

interface Habit {
  id: string;
  title: string;
  description: string | null;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  startDate: Date;
  categoryId: string;
  category: {
    name: string;
    color: string;
  };
  completed: boolean;
}

export function HabitOverview() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits');
      if (!response.ok) throw new Error('Failed to fetch habits');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Habits</CardTitle>
        <CardDescription>Your habits for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <HabitToggle
                habitId={habit.id}
                completed={habit.completed}
                onToggle={fetchHabits}
              />
              <div className="space-y-1">
                <span className="font-medium">{habit.title}</span>
                <Badge
                  variant="secondary"
                  className={`${habit.category.color} text-white hover:${habit.category.color}`}
                >
                  {habit.category.name}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditHabitDialog habit={habit} onHabitUpdated={fetchHabits} />
              <DeleteHabitDialog
                habitId={habit.id}
                habitTitle={habit.title}
                onHabitDeleted={fetchHabits}
              />
            </div>
          </div>
        ))}

        {habits.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No habits found. Create a new habit to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}