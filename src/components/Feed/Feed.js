import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../Post/Post";
import { db } from "../../firebase";
import { useStateValue } from "./../../context/StateProvider";
import NewPost from "./../NewPost/NewPost";

const Feed = () => {
  const [{ user, posts }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        dispatch({ type: "SET_POSTS", posts: posts });
      });
  }, [dispatch]);

  return (
    <div className="feed">
      {user && <NewPost />}
      {posts.map((post) => (
        <Post key={post.id} postId={post.id} post={post.post} />
      ))}
    </div>
  );
};

export default Feed;
