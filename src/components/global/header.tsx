import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex">
          {/* <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">MyApp</span>
          </Link> */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/task-manager"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Task Manager
            </Link>
            <Link
              href="/recipe"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Recipe
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href="/login"
              className="transition-colors hover:text-foreground/80 text-foreground/60 px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 ml-4"
            >
              Get started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
