import { useMemo, useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./styles/App.css";

function App() {
  const [counter] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, title: "аа", body: "бб" },
    { id: 2, title: "гг", body: "аа" },
    { id: 3, title: "вв", body: "яя" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  // Отсортированный массив: sortedPosts
  const sortedPosts = useMemo(() => {
    console.log("Отработала функция getSortedPosts");
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  // Отсортированный и отфильтрованный массив: sortedAndSearchedPosts
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLocaleLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // post получаем из дочернего компонента PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />

      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {sortedAndSearchedPosts.length !== 0 ? (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
      ) : (
        <h1 className="text__center">Посты не найдены</h1>
      )}

      {counter && <Counter />}
      {counter && <ClassCounter />}
    </div>
  );
}

export default App;
