import { auth } from "@/auth";
import ProjectForm from "@/components/projects/ProjectForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="bg-orange-400 dark:bg-orange-500 flex items-center justify-center text-white !min-h-[230px]">
        <h1>Submit Your Project</h1>
      </section>

      <ProjectForm />
    </>
  );
};

export default Page;
