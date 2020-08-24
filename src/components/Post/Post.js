import React, { useState, useEffect } from "react";
import "./Post.scss";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ReplyIcon from "@material-ui/icons/Reply";
import PostMedia from "../PostMedia/PostMedia";
import { useStateValue } from "../../context/StateProvider";
import { db } from "../../firebase";
import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import PostComment from "./../PostComment/PostComment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Post({ post, postId }) {
  const [{ user }] = useStateValue();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState();
  const [likesDoc, setLikesDoc] = useState(null);
  const [hideComments, setHideComments] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  JavascriptTimeAgo.addLocale(en);

  useEffect(() => {
    let unsubscribe;
    let postLikesDoc;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(
            snapshot.docs.map(
              (doc) =>
                ({
                  likes: doc.data(),
                }.likes)
            )
          );
        });

      if (user?.uid) {
        postLikesDoc = db
          .collection("posts")
          .doc(postId)
          .collection("likes")
          .doc(user.uid);
        postLikesDoc.get().then((doc) => {
          if (doc.exists) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
          setLikesDoc(postLikesDoc);
        });
      }
    }

    return () => {
      unsubscribe();
    };
  }, [postId, user]);

  const handleLike = () => {
    likesDoc.get().then((doc) => {
      if (!doc.exists) {
        likePost();
      } else {
        unlikePost();
      }
    });
  };

  const likePost = () => {
    likesDoc.set({
      id: user.uid,
      username: user.displayName,
    });
    setIsLiked(true);
  };

  const unlikePost = () => {
    likesDoc.delete();
    setIsLiked(false);
  };

  const openPostActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closePostActionMenu = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };
  return (
    <>
      <div className="post">
        <div className="post__header">
          <div className="post__headerLeft">
            <Avatar variant="square" className="post__avatar" />
            <div className="post__userDetails">
              <h2 className="post__userName">{post.username}</h2>
              <p className="post__userRole">Developer</p>
              <p className="post__timestamp">
                {post.timestamp && (
                  <ReactTimeAgo
                    date={post.timestamp.toDate()}
                    timeStyle="twitter"
                    locale="en"
                  />
                )}
                <AccessTimeIcon style={{ fontSize: "15px" }} />
              </p>
            </div>
          </div>
          <div className="post__headerRight">
            {user && user.displayName === post.username ? (
              <button
                className="post__action"
                onClick={(e) => openPostActionMenu(e, postId)}
              >
                ...
              </button>
            ) : null}
          </div>
        </div>
        <p className="post__text">{post.text}</p>
        <div className="post__imageBlock">
          {post.mediaUrl && (
            <PostMedia mediaUrl={post.mediaUrl} mediaType={post.mediaType} />
          )}
          <div className="post__socialCount">
            <ThumbUpIcon
              className="post__thumbsIcon"
              style={{ fontSize: "20px" }}
            />
            <p className="post__likeCount">{likes.length}</p>
            <p
              className="post__commentCount"
              onClick={() => setHideComments(false)}
            >
              Comments
            </p>
          </div>
          {user && (
            <>
              <div className="post__buttonPanel">
                <Button onClick={handleLike}>
                  <ThumbUpAltOutlinedIcon
                    className={`post__buttonPanelIcon ${
                      isLiked && "post__buttonPanelIcon--active"
                    }`}
                    style={{
                      fontSize: "20px",
                    }}
                  />
                  Like
                </Button>
                <Button onClick={() => setHideComments(false)}>
                  <CommentOutlinedIcon
                    className="post__buttonPanelIcon"
                    style={{ fontSize: "20px" }}
                  />
                  Comment
                </Button>
                <Button>
                  <ReplyIcon
                    className="post__buttonPanelIcon"
                    style={{ fontSize: "20px" }}
                  />
                  Share
                </Button>
              </div>
              <PostComment
                user={user}
                postId={postId}
                hideComments={hideComments}
              />
            </>
          )}
        </div>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closePostActionMenu}
        className="post__actionMenu"
      >
        <MenuItem onClick={deletePost}>
          <DeleteOutlineIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default Post;
