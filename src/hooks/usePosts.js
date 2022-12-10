import { useMemo } from "react";

// Параметрами принимает посты (массив) и метод сортировки,
// возвращает отсортированный массив.
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};

// возвращает отсортированный и отфильтрованный массив.
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};
