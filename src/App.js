import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import PostService from "./api/postService";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/myModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import "./styles/App.css";

function App() {
  const [counter] = useState(false);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const options = [
    { value: "title", name: "По названию" },
    { value: "body", name: "По описанию" },
  ];

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // Отсортированный массив: sortedPosts
  // const sortedPosts = useMemo(() => {
  //   if (filter.sort) {
  //     return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
  //   }
  //   return posts;
  // }, [filter.sort, posts]);

  // Отсортированный и отфильтрованный массив: sortedAndSearchedPosts
  // const sortedAndSearchedPosts = useMemo(() => {
  //   return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query));
  // }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // post получаем из дочернего компонента PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // Получение постов с сервера
  async function fetchPosts() {
    // const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    // setPosts(response.data);
    const posts = await PostService.getAll();
    setPosts(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <div className="mt-2">
        <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      </div>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} options={options} />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />

      {counter && <Counter />}
      {counter && <ClassCounter />}
    </div>
  );
}

export default App;
