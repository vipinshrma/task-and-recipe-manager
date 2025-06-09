import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 w-full">
      <div className="max-w-2xl text-center mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Task & Recipe Manager</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Streamline your tasks and recipes in one place. Manage your to-dos and cooking plans efficiently with our intuitive platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          <Link href="/tasks" className="block p-6 border rounded-lg hover:bg-accent/50 transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
            <p className="text-muted-foreground">
              Organize, prioritize, and track your tasks with ease. Stay on top of your projects and deadlines.
            </p>
          </Link>
          <Link href="/recipe" className="block p-6 border rounded-lg hover:bg-accent/50 transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Recipe Management</h2>
            <p className="text-muted-foreground">
              Store, organize, and access your favorite recipes. Plan your meals and never forget a great dish.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
