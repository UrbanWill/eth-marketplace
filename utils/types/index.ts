interface Course {
  id: string;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
  index: number;
}

// eslint-disable-next-line import/prefer-default-export
export type { Course };
