import { useRef } from "react";
import { FaImages } from "react-icons/fa";
import "../../css/addimg.css";

// eslint-disable-next-line react/prop-types
const AddImage = ({ onChange }) => {
  const inputRef = useRef();

  const fileReader = (file) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      onChange(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOnContainerclick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    for (const file of files) {
      fileReader(file);
    }
  };

  return (
    <>
      <div className="AddImgWrapper" onClick={handleOnContainerclick}>
        <input
          className="input_field"
          type="file"
          accept="image"
          onChange={handleChange}
          ref={inputRef}
          hidden
          multiple
        />

        <FaImages className="icon" />
        <span>Add Images</span>
      </div>
    </>
  );
};

export default AddImage;
