import { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import "./styles/App.css";

function App() {
  const [counter] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([
    { id: 1, title: " Javascript", body: "Javascript - язык программирования" },
    { id: 2, title: " Javascript 2", body: "Javascript - язык программирования 2" },
    { id: 3, title: " Javascript 3", body: "Javascript - язык программирования 3" },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    // posts.push(newPost); либо, как ниже
    setPosts([...posts, newPost]);

    setTitle("");
    setBody("");
  };

  return (
    <div className="App">
      {title}
      <form>
        <MyInput type="text" placeholder="Название поста" value={title} onChange={(e) => setTitle(e.target.value)} />
        <MyInput type="text" placeholder="Описание поста" value={body} onChange={(e) => setBody(e.target.value)} />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов 1" />

      {counter && <Counter />}
      {counter && <ClassCounter />}
    </div>
  );
}

export default App;
