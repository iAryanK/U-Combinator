import {ThemeToggle} from "@/components/shared/ThemeToggle";
import Header from "@/components/home/Header";
import SearchForm from "@/components/home/SearchForm";

export default async function Home({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;

    return (
        <>
            <Header>
                <SearchForm
                    query={query}
                />
            </Header>
        </>
    );
}
