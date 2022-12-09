import { useMemo, useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/myModal/MyModal";
import "./styles/App.css";

function App() {
  const [counter] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, title: "аа", body: "бб" },
    { id: 2, title: "гг", body: "аа" },
    { id: 3, title: "вв", body: "яя" },
  ]);

  // ===========================================================================================
  // Поиск и сортировка
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const options = [
    { value: "title", name: "По названию" },
    { value: "body", name: "По описанию" },
  ];
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
  // Поиск и сортировка
  // ===========================================================================================
  // ===========================================================================================
  // Создание, удаление поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // post получаем из дочернего компонента PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  // Создание, удаление поста
  // ===========================================================================================
  // ===========================================================================================
  // Модальное окно
  const [modal, setModal] = useState(false);

  // Модальное окно
  // ===========================================================================================

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
