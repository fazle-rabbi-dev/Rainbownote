import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export const ImageUploader = ({ setFile, mediaUrl }) => {
  const [imageUrl, setImageUrl] = useState(mediaUrl || "");

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
    }
    const previewUrl = URL.createObjectURL(file);
    if (previewUrl) {
      setImageUrl(previewUrl);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="h-24 rounded flex justify-center items-center bg-light-2 text-dark-5 dark:bg-dark-3 dark:text-white">
        {imageUrl ? (
          <img
            className="rounded w-full h-full object-cover"
            src={imageUrl}
            alt=""
          />
        ) : (
          "Add cover"
        )}
      </div>
    </div>
  );
};
