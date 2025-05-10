import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import BaseForm from "@components/BaseForm";
import HeaderSection from "@pages/add-item-page/sections/HeaderSection";
import ItemImageInputField from "@pages/add-item-page/components/ItemImageInputField";
import ItemNameInputField from "@pages/add-item-page/components/ItemNameInputField";
import ItemDescriptionTextareaField from "@pages/add-item-page/components/ItemDescriptionTextareaField";
import ItemPriceInputField from "@pages/add-item-page/components/ItemPriceInputField";
import ItemTagInputField from "@pages/add-item-page/components/ItemTagInputField";
import TagsSection from "@pages/add-item-page/sections/TagsSection";
import { useImageHandler } from "@pages/add-item-page/hooks/useImageHandler";

const AddItemPage = () => {
  const [btnAvailable, setBtnAvailable] = useState(false);
  const [itemImage, setItemImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [tag, setTag] = useState("");
  const [itemTags, setItemTags] = useState(new Set());

  const { handleImageChange, handleImageDelete } =
    useImageHandler(setItemImage);

  const addToTag = useCallback(
    (tag) => {
      if (itemTags.has(tag)) {
        toast("이미 추가된 태그입니다.");
      }

      setItemTags((prev) => {
        const updateTags = new Set(prev);
        updateTags.add(tag);
        return updateTags;
      });

      setTag("");
    },
    [itemTags]
  );

  const handleTagsKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter" && tag !== "") {
        addToTag(tag);
      }
    },
    [tag, addToTag]
  );

  const deleteTag = useCallback((tag) => {
    setItemTags((prev) => {
      const updateTags = new Set(prev);
      updateTags.delete(tag);
      return updateTags;
    });
  }, []);

  useEffect(() => {
    const isValid =
      itemName.trim() !== "" &&
      itemDescription.trim() !== "" &&
      itemPrice.trim() !== "" &&
      itemTags.size > 0;

    setBtnAvailable(isValid);
  }, [itemImage, itemName, itemDescription, itemPrice, itemTags]);

  const preventSubmitOnEnter = (e) => {
    // enter로 폼 제출 방지 (태그 생성 기준이 enter로 되어 있기 때문)
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log({
      itemImage,
      itemName,
      itemDescription,
      itemPrice,
      tags: Array.from(itemTags),
    });
  };

  return (
    <BaseForm onSubmit={submitForm} onKeyDown={preventSubmitOnEnter}>
      <HeaderSection btnAvailable={btnAvailable} />

      <ItemImageInputField
        imageUrl={itemImage}
        onChange={handleImageChange}
        onDelete={handleImageDelete}
      />

      <ItemNameInputField value={itemName} onChange={setItemName} />

      <ItemDescriptionTextareaField
        value={itemDescription}
        onChange={setItemDescription}
      />

      <ItemPriceInputField value={itemPrice} onChange={setItemPrice} />

      <ItemTagInputField
        value={tag}
        onChange={setTag}
        onKeyUp={handleTagsKeyUp}
      />
      <TagsSection tags={itemTags} deleteTag={deleteTag} />
    </BaseForm>
  );
};

export default AddItemPage;
