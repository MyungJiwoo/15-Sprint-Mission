import { useCallback } from "react";

export const useImageHandler = (setImageUrl) => {
  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl((prevUrl) => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl);
          }
          return imageUrl;
        });
      }
    },
    [setImageUrl]
  );

  const handleImageDelete = useCallback(() => {
    setImageUrl("");
  }, [setImageUrl]);

  return { handleImageChange, handleImageDelete };
};
