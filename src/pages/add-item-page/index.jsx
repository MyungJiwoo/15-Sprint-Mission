import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@hooks/useDebounce";
import PlusIcon from "../../assets/icons/plus";
import CloseIcon from "../../assets/icons/close";

const AddItemPage = () => {
  const textareaRef = useRef(null);
  const [addItemData, setAddItemData] = useState({
    img: "",
    name: "",
    description: "",
    price: "",
    tags: new Set(),
  });
  const [tag, setTag] = useState("");
  const [btnAvaliable, setBtnAvaliable] = useState(false);
  const [isImgError, setIsImgError] = useState(false);

  // * 값 변경 감지
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      const file = files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // 미리보기용 URL 생성
        setAddItemData((prev) => ({
          ...prev,
          img: imageUrl,
        }));
      }
      return;
    }

    if (name === "description") {
      const textarea = textareaRef.current; // 사용자 입력에 따라 textarea 높이 조절
      textarea.style.height = "auto"; // 지워졌을때 다시 크기가 줄어들기
      textarea.style.height = `${textarea.scrollHeight}px`; // scrollHeight만큼 다시 설정
    }

    const newData = {
      ...addItemData,
      [name]: value,
    };
    setAddItemData(newData);
    console.log(newData);
  };

  const handleTagsChange = () => {
    const trimmedTag = tag.trim();
    if (trimmedTag !== "") {
      setAddItemData((prev) => {
        const newTags = new Set(prev.tags);
        newTags.add(trimmedTag); // 중복 자동 제거됨
        return {
          ...prev,
          tags: newTags,
        };
      });
    }
    setTag("");
  };

  const deleteImg = () => {
    setAddItemData((prev) => ({
      ...prev,
      img: "",
    }));
  };

  const deleteTag = (tagToDelete) => {
    setAddItemData((prev) => {
      const newTags = new Set(prev.tags);
      newTags.delete(tagToDelete);
      return {
        ...prev,
        tags: newTags,
      };
    });
  };

  // * debounce
  // debounce로 300ms 입력이 감지되지 않을 때 유효성 검사
  const debouncedData = useDebounce(addItemData, 300);

  useEffect(() => {
    const { img, name, description, price, tags } = debouncedData;
    if (img !== "") setIsImgError(true);
    else setIsImgError(false);

    // 유효성 검사: 모든 필드가 빈 문자열이 아님
    const isAllFilled =
      name !== "" && description !== "" && price !== "" && tags.size > 0;

    if (isAllFilled) {
      setBtnAvaliable(true);
    } else {
      setBtnAvaliable(false);
    }
  }, [debouncedData]);

  // * 제출
  const submitItem = (e) => {
    e.preventDefault();
    console.log(addItemData);
  };

  return (
    <Form onSubmit={submitItem}>
      <HeaderSection>
        <Title>상품 등록하기</Title>
        {btnAvaliable ? (
          <SubmitBtn>등록</SubmitBtn>
        ) : (
          <SubmitBtn disabled>등록</SubmitBtn>
        )}
      </HeaderSection>

      <InputSection>
        <SubTitle>상품 이미지</SubTitle>
        <ImgInputContainer>
          <ImgLabel htmlFor="itemImage">
            <PlusIcon />
            <p>이미지 등록</p>

            <ImgInput
              type="file"
              id="itemImage"
              accept="image/*"
              name="img"
              onChange={handleChange}
            />
          </ImgLabel>

          {addItemData.img && (
            <PreviewImgContainer>
              <PreviewImg
                src={addItemData.img ? addItemData.img : ""}
                alt="이미지 업로드"
              />
              <CloseIconBtn onClick={deleteImg}>
                <CloseIcon />
              </CloseIconBtn>
            </PreviewImgContainer>
          )}
        </ImgInputContainer>
        {isImgError && (
          <ErrorMsg>* 이미지 등록은 최대 1개까지 가능합니다.</ErrorMsg>
        )}
      </InputSection>

      <InputSection>
        <SubTitle>상품명</SubTitle>
        <Input
          type="text"
          name="name"
          placeholder="상품명을 입력해주세요"
          value={addItemData.name}
          onChange={handleChange}
        />
      </InputSection>

      <InputSection>
        <SubTitle>상품 소개</SubTitle>
        <Textarea
          ref={textareaRef}
          name="description"
          placeholder="상품 소개를 입력해주세요"
          value={addItemData.description}
          onChange={handleChange}
        />
      </InputSection>

      <InputSection>
        <SubTitle>판매 가격</SubTitle>
        <Input
          type="number"
          min={0}
          name="price"
          placeholder="판매 가격을 입력해주세요"
          value={addItemData.price}
          onChange={handleChange}
        />
      </InputSection>

      <InputSection>
        <SubTitle>태그</SubTitle>
        <Input
          type="text"
          name="tags"
          placeholder="태그를 입력해주세요"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onBlur={handleTagsChange}
        />
        <TagsContainer>
          {Array.from(addItemData.tags).map((tag) => (
            <Tag key={tag}>
              #{tag}
              <TagCloseBtn onClick={() => deleteTag(tag)}>
                <CloseIcon />
              </TagCloseBtn>
            </Tag>
          ))}
        </TagsContainer>
      </InputSection>
    </Form>
  );
};

export default AddItemPage;

const Form = styled.form`
  margin: 2.4rem 0;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 3.2rem;
  color: var(--gray900);
`;

const SubmitBtn = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 1.2rem;
  border: none;
  background-color: var(--blue);
  font-size: 1.6rem;
  color: var(--white);

  &:disabled {
    background-color: var(--gray300);
    cursor: not-allowed;
  }
`;

const InputSection = styled.div`
  margin: 3rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.6rem 2.4rem;
  background-color: var(--gray100);
  border-radius: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 8rem;
  resize: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  background-color: var(--gray100);
  border-radius: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const SubTitle = styled(Title)`
  margin-bottom: 1.6rem;
  font-size: 1.8rem;
`;

const ImgLabel = styled.label`
  width: 20rem;
  height: 20rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 1.2rem;
  background-color: var(--gray100);
  cursor: pointer;

  p {
    font-size: 1.4rem;
    color: var(--gray300);
  }

  &:hover {
    opacity: 0.7;
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgInputContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const PreviewImgContainer = styled.div`
  width: 20rem;
  height: 20rem;
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: var(--white);
  border: 1px solid var(--gray100);
  border-radius: 1.2rem;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const CloseIconBtn = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: var(--gray300);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const TagsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.p`
  width: fit-content;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 3rem;
  background-color: var(--gray100);
  font-size: 1.4rem;
`;

const TagCloseBtn = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: var(--gray300);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #f74747;
`;
