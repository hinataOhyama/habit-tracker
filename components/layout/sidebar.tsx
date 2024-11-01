'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, BookOpen, Heart, Target } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreateHabitDialog } from '@/components/habits/create-habit-dialog';

const routes = [
  {
    label: 'Dashboard',
    icon: Target,
    href: '/',
    color: 'text-sky-500',
  },
  {
    label: 'Health & Fitness',
    icon: Heart,
    href: '/categories/health',
    color: 'text-emerald-500',
  },
  {
    label: 'Learning',
    icon: BookOpen,
    href: '/categories/learning',
    color: 'text-indigo-500',
  },
  {
    label: 'Mindfulness',
    icon: Brain,
    href: '/categories/mindfulness',
    color: 'text-violet-500',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-[calc(100vh-4rem)] bg-muted/50 w-64">
      <div className="px-3 py-2">
        <CreateHabitDialog />
      </div>
      <ScrollArea className="flex-1 px-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
              pathname === route.href ? 'bg-primary/10' : 'text-muted-foreground'
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn('h-4 w-4 mr-3', route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}