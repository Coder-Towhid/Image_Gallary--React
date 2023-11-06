import { useEffect, useState } from "react";
import "../../css/image.css";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
// eslint-disable-next-line react/prop-types
const Image = ({
  imageSrc,
  className,
  onImageSelect,
  id,
  selectedImages = [],
}) => {
  const [isChecked, setChecked] = useState(selectedImages.includes(id));

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = () => {
    onImageSelect(id, !isChecked);
  };

  useEffect(() => {
    setChecked(selectedImages.includes(id));
  }, [selectedImages, id]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className || "default"}
    >
      <div className="card">
        <input
          className={isChecked ? "show" : ""}
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={handleChange}
        />
        <img className={isChecked ? "selected" : ""} src={imageSrc} />
      </div>
    </div>
  );
};

export default Image;
