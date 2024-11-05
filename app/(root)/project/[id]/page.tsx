import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  PROJECT_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import Header from "@/components/home/Header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/projects/View";
import ProjectCard, { ProjectTypeCard } from "@/components/shared/ProjectCard";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // parallel fetch
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <Header heading={post.title} subHeading={formatDate(post?._createdAt)}>
        <h2 className="max-w-4xl mx-auto font-work-sans tracking-tight italic px-5 text-center">
          {post.description}
        </h2>
      </Header>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center bg-sky-500 rounded-xl p-10 max-w-4xl mx-auto">
          <Image
            src={post.image}
            alt="thumbnail"
            width={800}
            height={400}
            className="w-4/5 rounded-xl"
          />
        </div>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-5 pb-4">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-lg font-medium">{post.author.name}</p>
                <p className="text-sm font-light">@{post.author.username}</p>
              </div>
            </Link>

            <p className="text-[16px] bg-secondary px-4 py-2 rounded-full font-mono">
              {post.category}
            </p>
          </div>

          <h3 className="text-xl font-bold italic">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="border-dashed max-w-4xl my-10 mx-auto" />

        {/* TODO: EDITOR PICKS */}
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl font-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: ProjectTypeCard, i: number) => (
                <ProjectCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={
            <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
