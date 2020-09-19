import React, { useState, useEffect, memo } from "react";
import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "./PostComment.scss";
import { Avatar, TextField, Menu, MenuItem } from "@material-ui/core";
import { db } from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "./../../context/StateProvider";
import ShowMoreText from "react-show-more-text";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const PostComment = memo(({ post, postId, hideComments }) => {
  const [{ user }] = useStateValue();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  JavascriptTimeAgo.addLocale(en);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => unsubscribe();
  }, [postId]);
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const openMenu = (event, commentId) => {
    setSelectedComment(commentId);
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const deleteComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(selectedComment)
      .delete();
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const postComment = (event) => {
    event.preventDefault();
    const newComment = comment.replace(/\n/g, "\n");
    db.collection("posts").doc(postId).collection("comments").add({
      text: newComment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="comments">
      {!hideComments && (
        <div className="comments__list">
          <form onSubmit={postComment}>
            <div className="comments__newComment">
              <Avatar className="comments__avatar">
                {user.displayName && user.displayName.slice(0, 1)}
              </Avatar>
              <TextField
                id="outlined-textarea"
                placeholder="Add a comment..."
                multiline
                variant="outlined"
                className="comments__newInput"
                onChange={handleChange}
                value={comment}
              />
            </div>
            {comment && (
              <button className="comments__newCommentBtn" onClick={postComment}>
                Post
              </button>
            )}
          </form>
          {!hideComments &&
            comments.map((comment) => {
              return (
                <div key={comment.id} className="comments__listItem">
                  <Avatar className="comments__avatar">
                    {comment.comment.username.slice(0, 1)}
                  </Avatar>
                  <div className="comments__wrapper">
                    <div className="comments__titleWrapper">
                      <div className="comments__titleLeft">
                        <h4 className="comments__username">
                          {comment.comment.username}
                        </h4>
                      </div>
                      <div className="comments__titleRight">
                        {comment.comment.timestamp ? (
                          <ReactTimeAgo
                            date={comment.comment.timestamp.toDate()}
                            timeStyle="twitter"
                            locale="en"
                          />
                        ) : (
                          "now"
                        )}
                        {user.displayName === comment.comment.username ? (
                          <button
                            className="comments__action"
                            onClick={(e) => openMenu(e, comment.id)}
                          >
                            ...
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="comments__textWrapper">
                      <ShowMoreText
                        lines={6}
                        more="...see more"
                        less="...see less"
                        anchorClass=""
                        expanded={false}
                        className="comments__seeMore"
                      >
                        {comment.comment.text.split("\n").map((item, i) => (
                          <p key={i}>
                            {item}
                            <br />
                          </p>
                        ))}
                      </ShowMoreText>
                    </div>
                  </div>
                </div>
              );
            })}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            className="comments__actionMenu"
          >
            <MenuItem onClick={deleteComment}>
              <DeleteOutlineIcon fontSize="small" />
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}

      {comments.length === 0 && (
        <p className="comments__list--empty">Be the first to comment on this</p>
      )}
    </div>
  );
});

export default PostComment;

// New Post
// Load more Post
// Load more comments
// sidebars

// list of likes

// lazy loading
// url rendering
