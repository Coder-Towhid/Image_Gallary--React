import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../css/gallary.css";
import GallaryContents from "./GallaryContents";
import GallaryHeader from "./GallaryHeader";

const Gallary = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleImageAdd = (image) => {
    setImages((prev) => [...prev, { src: image, id: uuidv4() }]);
    console.log(images);
  };

  const handleImageSelect = (id, add = true) => {
    if (add) {
      setSelectedImages((prev) => [...prev, id]);
      return;
    } else {
      setSelectedImages((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleImageDelete = () => {
    setImages((prev) =>
      prev.filter((image) => !selectedImages.includes(image.id))
    );
    setSelectedImages([]);
  };

  const handleUnselect = () => {
    setSelectedImages([]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over || active?.id === over?.id) return;

    setImages((images) => {
      const overItemIndex = images.findIndex((image) => image.id === over.id);
      const activeItemIndex = images.findIndex(
        (image) => image.id === active.id
      );

      return arrayMove(images, activeItemIndex, overItemIndex);
    });
  };

  return (
    <div className="gallary-container">
      <GallaryHeader
        selectedImageCount={selectedImages.length}
        onImageDelete={handleImageDelete}
        onUnselect={handleUnselect}
      />
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <GallaryContents
          selectedImages={selectedImages}
          images={images}
          onImageAdd={handleImageAdd}
          onImageSelect={handleImageSelect}
        />
      </DndContext>
    </div>
  );
};

export default Gallary;
