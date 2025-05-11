import { memo, useRef } from "react";
import TextareaField from "@components/TextareaField";

const PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

const InquiryTextareaField = ({ value, onChange, isEdit }) => {
  const ref = useRef(null);

  const handleInputChange = (event) => {
    const textarea = ref.current; // 사용자 입력에 따라 textarea 높이 조절
    textarea.style.height = "auto"; // 지워졌을때 다시 크기가 줄어들기
    textarea.style.height = `${textarea.scrollHeight}px`; // scrollHeight만큼 다시 설정

    onChange(event.target.value);
  };

  return (
    <TextareaField
      ref={ref}
      id="inquiry"
      label={!isEdit && "문의하기"}
      name="inquiry"
      placeholder={PLACEHOLDER}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default memo(InquiryTextareaField);
