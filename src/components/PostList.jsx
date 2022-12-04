import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  return (
    <div>
      <h1 className="text__center">{title} </h1>

      {posts && posts.map((post, index) => <PostItem number={index + 1} key={post.id} post={post} remove={remove} />)}
    </div>
  );
};

export default PostList;
