import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(PROJECT_VIEWS_QUERY, { id });

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="font-medium text-[16px] bg-secondary px-4 py-2 rounded-lg capitalize">
        <span className="font-bold text-lg">
          {" "}
          {totalViews} {totalViews === 1 ? "View" : "Views"}
        </span>
      </p>
    </div>
  );
};
export default View;
