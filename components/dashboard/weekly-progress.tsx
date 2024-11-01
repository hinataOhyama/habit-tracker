'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function WeeklyProgress() {
  const days = [
    { name: 'Mon', progress: 100 },
    { name: 'Tue', progress: 100 },
    { name: 'Wed', progress: 85 },
    { name: 'Thu', progress: 90 },
    { name: 'Fri', progress: 75 },
    { name: 'Sat', progress: 60 },
    { name: 'Sun', progress: 40 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Your habit completion by day</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map((day) => (
          <div key={day.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{day.name}</span>
              <span className="text-sm text-muted-foreground">
                {day.progress}%
              </span>
            </div>
            <Progress value={day.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}