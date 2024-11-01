import { HabitOverview } from '@/components/habits/habit-overview';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { WeeklyProgress } from '@/components/dashboard/weekly-progress';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Track your progress and build better habits
        </p>
      </div>
      
      <StatsCards />
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <WeeklyProgress />
        <HabitOverview />
      </div>
    </div>
  );
}