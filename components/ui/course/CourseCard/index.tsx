import { FC, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "utils/types";

interface Props {
  course: Course;
  Footer?: () => ReactElement | null;
  disabled?: boolean;
}

const CourseCard: FC<Props> = ({ course, Footer, disabled }) => {
  const { coverImage, title, type, description, slug } = course;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={coverImage}
            layout="responsive"
            width="200"
            height="230"
            alt={title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {type}
          </div>
          <Link href={`/courses/${slug}`}>
            <a className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {`${title.substring(0, 70)}...`}
            </a>
          </Link>
          <p className="mt-2 text-gray-500">{description}</p>
          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
};

CourseCard.defaultProps = {
  Footer: () => null,
  disabled: false,
};
export default CourseCard;
