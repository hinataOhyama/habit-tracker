import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.completion.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.habitCategory.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.habitCategory.create({
      data: {
        name: "Health & Fitness",
        description: "Habits related to physical well-being",
        color: "#10B981", // Emerald
        icon: "heart",
      },
    }),
    prisma.habitCategory.create({
      data: {
        name: "Learning",
        description: "Habits for personal growth and education",
        color: "#6366F1", // Indigo
        icon: "book-open",
      },
    }),
    prisma.habitCategory.create({
      data: {
        name: "Productivity",
        description: "Habits for better work and time management",
        color: "#F59E0B", // Amber
        icon: "target",
      },
    }),
    prisma.habitCategory.create({
      data: {
        name: "Mindfulness",
        description: "Habits for mental well-being",
        color: "#8B5CF6", // Violet
        icon: "brain",
      },
    }),
  ]);

  // Create a demo user
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@example.com",
    },
  });

  // Create habits for the demo user
  const habits = await Promise.all([
    prisma.habit.create({
      data: {
        title: "Morning Exercise",
        description: "30 minutes of exercise every morning",
        frequency: "DAILY",
        startDate: new Date(),
        userId: user.id,
        categoryId: categories[0].id,
      },
    }),
    prisma.habit.create({
      data: {
        title: "Read Technical Books",
        description: "Read technical books for 30 minutes",
        frequency: "DAILY",
        startDate: new Date(),
        userId: user.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.habit.create({
      data: {
        title: "Weekly Planning",
        description: "Plan next week's tasks and goals",
        frequency: "WEEKLY",
        startDate: new Date(),
        userId: user.id,
        categoryId: categories[2].id,
      },
    }),
    prisma.habit.create({
      data: {
        title: "Meditation",
        description: "15 minutes of mindfulness meditation",
        frequency: "DAILY",
        startDate: new Date(),
        userId: user.id,
        categoryId: categories[3].id,
      },
    }),
  ]);

  // Create some completion records
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await Promise.all([
    prisma.completion.create({
      data: {
        date: today,
        habitId: habits[0].id,
      },
    }),
    prisma.completion.create({
      data: {
        date: yesterday,
        habitId: habits[0].id,
      },
    }),
    prisma.completion.create({
      data: {
        date: today,
        habitId: habits[1].id,
      },
    }),
  ]);

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
