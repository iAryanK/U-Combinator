import {ThemeToggle} from "@/components/shared/ThemeToggle";
import Header from "@/components/home/Header";
import SearchForm from "@/components/home/SearchForm";
import ProjectCard from "@/components/shared/ProjectCard";

export default async function Home({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;

    const posts = [
        {
            _createdAt: "2021-09-01T00:00:00.000Z",
            views: 100,
            _id: 1,
            title: "Project 1",
            description: "This is some dummy data for the project description",
            image: "https:placehold.co/600x400",
            author: {
                _id: 1,
                image: "https:placehold.co/48x48",
                name: "John Doe"
            },
            category: "Tech"
        },
    ]

    return (
        <>
            <Header>
                <SearchForm
                    query={query}
                />
            </Header>

            <section className="section_container">
                <p className="text-3xl font-semibold">
                    {query ? (<>Search Results for <span
                        className="italic font-medium">{query}</span></>) : (<>All
                        Projects</>)}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post) => (
                            <ProjectCard key={post?._id} post={post}/>
                        ))
                    ) : (
                        <p>No projects found</p>
                    )}
                </ul>
            </section>
        </>
    );
}
