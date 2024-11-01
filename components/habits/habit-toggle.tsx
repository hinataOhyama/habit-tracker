'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle } from 'lucide-react';

interface HabitToggleProps {
  habitId: string;
  completed: boolean;
  onToggle: () => void;
}

export function HabitToggle({
  habitId,
  completed,
  onToggle,
}: HabitToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const toggleCompletion = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/habits/${habitId}/completion`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle habit completion');
      }

      onToggle();
      toast.success(
        completed ? 'Habit marked as incomplete' : 'Habit marked as complete'
      );
    } catch (error) {
      console.error('Error toggling habit:', error);
      toast.error('Failed to update habit status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCompletion}
      disabled={isLoading}
      className={completed ? 'text-primary' : 'text-muted-foreground'}
    >
      {completed ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <Circle className="h-5 w-5" />
      )}
    </Button>
  );
}