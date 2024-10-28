import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {ThemeToggle} from "@/components/shared/ThemeToggle";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 border-b shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={100} height={100} className="bg-yellow-200 p-[2px] h-10 w-10 rounded-[2px]" priority/>
                </Link>

                <div className="flex items-center gap-5">
                    <ThemeToggle />
                    {session && session?.user ? (
                        <>
                            <Button className="text-md" asChild>
                                <Link href="/project/create">
                                    <span className="max-sm:hidden">Create</span>
                                    <BadgePlus className="size-6 sm:hidden" />
                                </Link>
                            </Button>

                            <form
                                action={async () => {
                                    "use server";

                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <Button type="submit" className="text-md" variant="secondary">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </Button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback><Skeleton className=""/></AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";

                                await signIn("github");
                            }}
                        >
                            <Button type="submit" className="text-md py-1">Login</Button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;