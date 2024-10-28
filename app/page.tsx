import {ThemeToggle} from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <main className="border-2 h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
            <h1 className="font-work-sans">U-Combinator</h1>
            <ThemeToggle/>
        </div>
    </main>
  );
}
