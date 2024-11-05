import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import UserProjects from "@/components/projects/UserProjects";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card font-work-sans">
          <div className="profile_title">
            <h3 className="text-2xl uppercase text-center line-clamp-1 font-extrabold ">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-2xl font-extrabold mt-7 text-center text-white">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-sm font-normal text-gray-300 tracking-wide ">
            {user?.bio}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-3xl font-bold">
            {session?.id === id ? "Your" : "All"} Projects
          </p>
          <ul className="grid sm:grid-cols-2 gap-5">
            <Suspense fallback={<ProjectCardSkeleton />}>
              <UserProjects id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export const ProjectCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-300" />
      </li>
    ))}
  </>
);

export default Page;
