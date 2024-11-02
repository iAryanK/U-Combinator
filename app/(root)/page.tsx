import Header from "@/components/home/Header";
import SearchForm from "@/components/home/SearchForm";
import ProjectCard, { ProjectTypeCard } from "@/components/shared/ProjectCard";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(PROJECTS_QUERY);

  return (
    <>
      <Header>
        <SearchForm query={query} />
      </Header>

      <section className="section_container">
        <p className="text-3xl font-semibold">
          {query ? (
            <>
              Search Results for{" "}
              <span className="italic font-medium">{query}</span>
            </>
          ) : (
            <>All Projects</>
          )}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ProjectTypeCard) => (
              <ProjectCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </ul>
      </section>
    </>
  );
}
