import { array, func } from "prop-types";
import "../../css/gallary-container.css";
import AddImage from "../gallary/AddImage";
import Image from "../gallary/Image";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

const GallaryContents = ({
  images,
  onImageSelect,
  onImageAdd,
  selectedImages,
}) => {
  const sortableItems = useMemo(() => {
    return images.map((image) => image.id);
  }, [images]);

  return (
    <div className="gallary-image-container">
      <SortableContext items={sortableItems}>
        {images.map((image, index) => (
          <Image
            key={`gallary-image-${index}`}
            selectedImages={selectedImages}
            imageSrc={image.src}
            id={image.id}
            onImageSelect={onImageSelect}
            className={index === 0 ? "featured" : ""}
          />
        ))}
      </SortableContext>

      <AddImage onChange={onImageAdd} />
    </div>
  );
};

GallaryContents.propTypes = {
  images: array,
  onImageSelect: func,
  onImageAdd: func,
  selectedImages: array,
};

export default GallaryContents;
