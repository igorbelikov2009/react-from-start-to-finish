import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 className="text__center">Посты не найдены!</h1>;
  }

  return (
    <div>
      <h1 className="text__center">{title} </h1>
      <TransitionGroup>
        {posts &&
          posts.map((post, index) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem number={index + 1} post={post} remove={remove} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
