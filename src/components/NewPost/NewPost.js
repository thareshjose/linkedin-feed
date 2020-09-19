import React, { useState } from "react";
import "./NewPost.scss";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, TextField } from "@material-ui/core";
import { useStateValue } from "../../context/StateProvider";
import { db } from "../../firebase";
import firebase from "firebase";
import ImageUpload from "./../ImageUpload/ImageUpload";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 50,
  },
}));

function NewPost() {
  const [{ user }] = useStateValue();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setImageUrl(null);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const setImage = (url) => {
    setImageUrl(url);
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  const addPost = () => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      mediaType: "image",
      mediaUrl: imageUrl,
      text: text,
    });
    setOpen(false);
    setImageUrl(null);
    setText("");
  };
  return (
    <>
      <div className="addPost">
        <button className="addPost__button" onClick={() => setOpen(true)}>
          <CreateIcon fontSize="small" />
          <label className="addPost__btnLabel"> Start a post</label>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal__container">
            <div className="modal__title">
              <h3>Create a post</h3>
              <CloseIcon
                className="modal__closeIcon"
                style={{ fontSize: "30px" }}
                onClick={handleClose}
              />
            </div>
            <div className="modal__wrapper">
              <div className="modal__userDetails">
                <Avatar className="modal__userAvatar">
                  {user.displayName && user.displayName.slice(0, 1)}
                </Avatar>
                <label className="modal__userName">{user.displayName}</label>
              </div>
              <div className="modal__postText">
                <TextField
                  id="outlined-textarea"
                  placeholder="What do you want to talk about?"
                  multiline
                  variant="outlined"
                  className="modal__newInput"
                  onChange={handleChange}
                  value={text}
                />
              </div>
              {imageUrl && (
                <div className="modal__imageWrapper">
                  <img
                    src={imageUrl}
                    alt="upload-img"
                    className="modal__uploadedImage"
                  />
                  <CloseIcon
                    className="modal__imageDeleteIcon"
                    style={{ fontSize: "30px" }}
                    onClick={removeImage}
                  />
                </div>
              )}
            </div>
            <div className="modal__postFooter">
              <ImageUpload setImageURL={setImage} imageUrl={imageUrl} />
              <button className="modal__postButton" onClick={addPost}>
                Post
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <p className="line"></p>
    </>
  );
}

export default NewPost;
