'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Habit Tracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}