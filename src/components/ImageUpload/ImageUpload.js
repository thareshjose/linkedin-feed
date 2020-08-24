import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import "./ImageUpload.scss";

function ImageUpload({ imageUrl, setImageURL }) {
  const [image, setImage] = useState(null);
  const imageInputRef = React.useRef();

  useEffect(() => {
    uploadImage();
  }, [image]);

  const uploadImage = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //Error
          console.log(error);
        },
        () => {
          //upload complete
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImageURL(url);
              setImage(null);
              imageInputRef.current.value = null;
            });
        }
      );
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="upload__wrapper">
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        ref={imageInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload"
        className={`upload__imageIcon ${
          image !== null || (image === null && imageUrl !== null)
            ? "upload__imageIcon--disabled"
            : ""
        }`}
      >
        <AddAPhotoIcon />
      </label>
    </div>
  );
}

export default ImageUpload;
