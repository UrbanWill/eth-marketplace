import { ParsedUrlQuery } from "querystring";

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

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IWeb3Context {
  test: string;
}

export type { Course, IParams, IWeb3Context };
