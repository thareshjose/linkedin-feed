import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import "./PostMedia.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "transparent",
    border: "none",
    outline: "none",
  },
}));

function PostMedia({ mediaType, mediaUrl }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <CloseIcon
            className="postModal__closeIcon"
            style={{ fontSize: "40px" }}
            onClick={() => setOpen(false)}
          />
          <img src={mediaUrl} alt={mediaType} className="postModal__media" />
        </div>
      </Modal>
      <img
        src={mediaUrl}
        alt={mediaType}
        className="post__image"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}

export default PostMedia;
