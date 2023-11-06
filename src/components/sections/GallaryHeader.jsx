import { number, func } from "prop-types";
import "../../css/header.css";

const GallaryHeader = ({ selectedImageCount, onImageDelete, onUnselect }) => {
  return (
    <header>
      {selectedImageCount > 0 ? (
        <GallaryImageDeleteHeader
          selectedImageCount={selectedImageCount}
          onImageDelete={onImageDelete}
          onUnselect={onUnselect}
        />
      ) : (
        <GallaryTitleHeader />
      )}
    </header>
  );
};

const GallaryImageDeleteHeader = ({
  selectedImageCount,
  onImageDelete,
  onUnselect,
}) => {
  return (
    <div className="header-wrapper">
      <div className="delete-container">
        <div className="total-selected">
          <input type="checkbox" defaultChecked={true} onChange={onUnselect} />
          <p>
            <span>{selectedImageCount}</span>
            Files Selected
          </p>
        </div>
        <div className="deleteBtn">
          <span onClick={onImageDelete}>Delete Files</span>
        </div>
      </div>
    </div>
  );
};

const GallaryTitleHeader = () => {
  return (
    <div className="header-wrapper">
      <div className="title">
        <h1>GALLARY</h1>
      </div>
    </div>
  );
};

GallaryHeader.propTypes = {
  onUnselect: func,
  selectedImageCount: number,
  onImageDelete: func,
};

GallaryImageDeleteHeader.propTypes = {
  onUnselect: func,
  selectedImageCount: number,
  onImageDelete: func,
};

export default GallaryHeader;
