'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, BookOpen, Heart, Target } from 'lucide-react';
import { EditHabitDialog } from '@/components/habits/edit-habit-dialog';
import { DeleteHabitDialog } from '@/components/habits/delete-habit-dialog';
import { HabitToggle } from '@/components/habits/habit-toggle';

const categoryConfig = {
  health: {
    title: 'Health & Fitness',
    description: 'Track your health and fitness habits',
    icon: Heart,
    color: 'text-emerald-500',
  },
  learning: {
    title: 'Learning',
    description: 'Monitor your learning and development habits',
    icon: BookOpen,
    color: 'text-indigo-500',
  },
  productivity: {
    title: 'Productivity',
    description: 'Manage your productivity habits',
    icon: Target,
    color: 'text-amber-500',
  },
  mindfulness: {
    title: 'Mindfulness',
    description: 'Track your mindfulness and wellness habits',
    icon: Brain,
    color: 'text-violet-500',
  },
};

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
  streak: number;
  completionRate: number;
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const category = categoryConfig[params.category as keyof typeof categoryConfig];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  const fetchHabits = async () => {
    try {
      const response = await fetch(`/api/habits/category/${params.category}`);
      if (!response.ok) throw new Error('Failed to fetch habits');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [params.category]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Icon className={`h-8 w-8 ${category.color}`} />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{category.title}</h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <HabitToggle
                  habitId={habit.id}
                  completed={habit.completed}
                  onToggle={fetchHabits}
                />
                <div>
                  <CardTitle>{habit.title}</CardTitle>
                  <CardDescription>{habit.description}</CardDescription>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Badge variant="outline">{habit.frequency}</Badge>
                  <p className="text-sm text-muted-foreground">
                    Started {new Date(habit.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {habit.completionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{habit.completionRate}%</span>
                </div>
                <Progress value={habit.completionRate} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Current Streak</span>
                <span className="font-medium">{habit.streak} days</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {habits.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Icon className={`h-12 w-12 ${category.color} mb-4 opacity-50`} />
              <p className="text-lg font-medium">No habits found</p>
              <p className="text-sm text-muted-foreground">
                Create a new habit to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}