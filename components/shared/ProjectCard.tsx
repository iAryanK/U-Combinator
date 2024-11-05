import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Project, Author } from "@/sanity/types";

export type ProjectTypeCard = Omit<Project, "author"> & { author?: Author };

const ProjectCard = ({ post }: { post: ProjectTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="form group font-work-sans">
      <div className="flex items-center justify-between">
        <p className="project_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6" />
          <span className="text-base font-medium">{views}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-sm font-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/project/${_id}`}>
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          {author?.image ? (
            <Image
              src={author.image}
              alt={author.name!}
              width={48}
              height={48}
              className="rounded-full bg-white"
            />
          ) : (
            <div className="rounded-full bg-secondary flex items-center justify-center font-medium text-2xl w-12 h-12">
              {author?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </div>

      <Link href={`/project/${_id}`}>
        <p className="project-card_desc">{description}</p>

        {image && (
          <Image
            src={image}
            alt="placeholder"
            width={1000}
            height={1000}
            className="project-card_img"
          />
        )}
      </Link>

      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-sm font-medium">{category}</p>
        </Link>
        <Button
          className="project-card_btn bg-fuchsia-500 hover:bg-fuchsia-400 dark:bg-fuchsia-600 hover:dark:bg-fuchsia-500"
          size="sm"
          asChild
        >
          <Link href={`/project/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default ProjectCard;
